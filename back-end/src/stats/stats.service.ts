import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplexService } from 'src/complex/complex.service';
import { CourtsService } from 'src/courts/courts.service';
import { MatchService } from 'src/match/match.service';
import { PointType, Stats } from 'src/models/stats.entity';
import { Term } from 'src/models/term.entity';
import { TeamsService } from 'src/teams/teams.service';
import { TermsService } from 'src/terms/terms.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {

    constructor(
        // @InjectRepository(Term) private readonly termsRepository: Repository<Term>,
        @InjectRepository(Stats) private readonly statsRepo: Repository<Stats>,
        private readonly userService: UsersService,
        private readonly complexService: ComplexService,
        private readonly courtsService: CourtsService,
        private readonly termSrevice: TermsService,
        private readonly matchSrevice: MatchService,
        //@Inject(forwardRef(() => ComplexService)) private readonly complexService: ComplexService
    ) { }

    private thisMonth() {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        return [startOfMonth, endOfMonth];
    }

    private thisWeek() {
        const date = new Date();

        const day = date.getDay();
        const offsetDay = (day === 0 ? -6 : 1) - day

        const monday = new Date();
        monday.setDate(date.getDate() + offsetDay);
        monday.setHours(0, 0, 0, 0);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);

        return [monday, sunday];
    }

    async monthStats(complex: number) {

        const [start, end] = this.thisMonth()

        let res = await this.termSrevice.getTermsByDateRange([complex], start, end)

        let totalCount = 0;
        let courtsCount: Record<string, number> = {}
        let players: Record<number, number> = {}
        let totalAmount = 0;
        let amountPerWeek: number[] = new Array(5).fill(0);

        res.forEach(el => {
            totalCount += el.term_court;
            courtsCount[el.name] = (courtsCount[el.name] || 0) + 1;
            totalAmount += el.term_count * el.price
            players[el.term_user] = (players[el.term_user] || 0) + 1;
            let week = this.getWeekInMonth(el.term_date);
            amountPerWeek[week - 1] += el.term_count * el.price
        })

        let topPlayer = Object.entries(players).reduce(
            (max, [id, count]) => count > max.count ? { id: Number(id), count } : max,
            { id: 0, count: 0 }
        );

        // console.log(totalCount,courtsCount,totalAmount,topPlayer,amountPerWeek)
        let formatted: { name: string, value: number }[] = [];
        amountPerWeek.forEach((el, index) => {
            formatted.push({ name: "Week " + (index + 1), value: el + index + 1 });
        })

        let topUser = await this.userService.getById(topPlayer.id);

        return {

            totalCount,
            courtsCount: Object.entries(courtsCount).map(
                ([name, value]) => ({ name, value })
            ),
            totalAmount,
            amountPerWeek: formatted,
            user:
            {
                topUser,
                count: topPlayer.count
            }

        }
    }

    async weekStats(complex: number) {
        const [start, end] = this.thisWeek();

        var res = await this.termSrevice.getTermsByDateRange([complex], start, end)

        let totalCount = 0;
        let totalAmount = 0;
        let courtsCount: Record<string, number> = {}
        let todayCount = 0;
        let todayAmount = 0;

        res.forEach(el => {

            totalCount += el.term_court;
            totalAmount += el.term_count * el.price
            courtsCount[el.name] = (courtsCount[el.name] || 0) + 1;

            if (new Date(el.term_date).getDate() === new Date().getDate()) {
                todayCount += el.term_court;
                todayAmount += el.term_count * el.price;
            }
        })

        return {

            totalCount,
            courtsCount: Object.entries(courtsCount).map(
                ([name, value]) => ({ name, value })
            ),
            totalAmount,
            todayCount,
            todayAmount

        }
    }

    private getWeekInMonth(date: string): number {
        const dt = new Date(date);
        const start = new Date(dt.getFullYear(), dt.getMonth(), 1);

        return Math.ceil((dt.getDate() + start.getDay()) / 7)
    }

    async globalStats(id: number) {

        let userComplexs = await this.complexService.getByUser(id);

        let ids = userComplexs.map(el => el.id)


        let noOfComplex = ids.length;
        let noOfCourts = (await this.courtsService.countCourtsByComplex(ids))[1]

        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1)
        const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)

        let res = await this.termSrevice.getTermsByDateRange(ids, startOfYear, endOfYear);


        let noOfTerms = res.length
        let totalAmount = 0;
        res.forEach(el => totalAmount += el.term_count * el.price)

        return {
            noOfComplex,
            noOfCourts,
            noOfTerms,
            totalAmount
        }
    }

    async createStats(currentServe:number)
    {
        const stats = this.statsRepo.create({ currentServe});
        return await this.statsRepo.save(stats);
    }

    private handlePoint(stats:Stats, index:number)
    {

        let currentPoints = index ? stats.points_t2 : stats.points_t1;
        let currentPointsOpponent = index ? stats.points_t1 : stats.points_t2;

        let newCurrent: string;
        let newCurrentOpponent: string = "";

        let finishGame: boolean = false;
        let finishSet: boolean = false;
        let finishMatch: boolean = false;

        let newCurrentGame: number = -1;
        let newCurrentSet: number = -1;

        if (+currentPoints == 15)
            newCurrent = PointType.THIRTY;
        else if (+currentPoints == 30)
            newCurrent = PointType.FORTY;
        //40:40 -> AD:0
        else if (+currentPoints == 40 && +currentPointsOpponent == 40) {
            newCurrent = PointType.ADVANTAGE;
            newCurrentOpponent = PointType.LOVE
        }
        //Gotov gem regularno
        else if (+currentPoints == 40) {
            newCurrent = PointType.LOVE;
            newCurrentOpponent = PointType.LOVE
            finishGame = true;
        }
        //AD:0 -> 0:0
        else if (currentPoints == PointType.ADVANTAGE) {
            newCurrent = PointType.LOVE;
            newCurrentOpponent = PointType.LOVE
            finishGame = true;
        }
        //Iz AD:0 -> 40:40
        else if (currentPoints == PointType.LOVE && currentPointsOpponent == PointType.ADVANTAGE) {
            newCurrent = PointType.FORTY;
            newCurrentOpponent = PointType.FORTY
        }
        //0:0 -> 15:0
        else
            newCurrent = PointType.FIFTEEN

        //Da li je gejm gotov
        if (finishGame) {
            let currentGames = index ? stats.game_t2 : stats.game_t1;
            newCurrentGame = ++currentGames;

            let currentOpponentGames = index ? stats.game_t1 : stats.game_t2;

            //Gotov je set
            if (currentGames >= 6 && currentGames - currentOpponentGames >= 2) {
                let currentSets = index ? stats.set_t2 : stats.set_t1;
                newCurrentSet = ++currentSets;

                finishSet = true;

                //Gotov je match
                if (currentSets == 2)
                    finishMatch = true;
            }
        }

        //Update statistike

        //Poen je osvojio tim 1
        if (!index) {

            stats.points_t1 = newCurrent;

            if (newCurrentOpponent != "")
                stats.points_t2 = newCurrentOpponent;

            if (newCurrentGame != -1)
                stats.game_t1 = newCurrentGame;

            if (newCurrentSet != -1)
                stats.set_t1 = newCurrentSet;
        }
        //Poen je osvojio tim 2
        else {
            stats.points_t2 = newCurrent;

            if (newCurrentOpponent != "")
                stats.points_t1 = newCurrentOpponent;

            if (newCurrentGame != -1)
                stats.game_t2 = newCurrentGame;

            if (newCurrentSet != -1)
                stats.set_t2 = newCurrentSet;
        }

        return [finishGame, finishSet, finishMatch]
    }

    async handleEvent(match_id:number,stats:Stats, index:number, team1:number, team2:number)
    {
        const [finishGame, finishSet, finishMatch] = this.handlePoint(stats, index);

        if (finishGame) {
            stats.currentServe = stats.currentServe == team1 ? team2 : team1;
        }

        await this.statsRepo.save(stats);

        if (finishMatch) {
            this.matchSrevice.finishMatch(match_id);
        }
    }

    async findById(id:number)
    {
        return await this.statsRepo.findOne({ where: { id} });
    }
}