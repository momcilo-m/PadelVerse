import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplexService } from 'src/complex/complex.service';
import { CourtsService } from 'src/courts/courts.service';
import { Term } from 'src/models/term.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {

    constructor(
        @InjectRepository(Term) private readonly termsRepository: Repository<Term>,
        private readonly userService: UsersService,
        private readonly complexService: ComplexService,
        private readonly courtsService: CourtsService
        //@Inject(forwardRef(() => ComplexService)) private readonly complexService: ComplexService
    ) { }


    private async getTermsByDateRange(complexes: number[], startOfMonth: Date, endOfMonth: Date) {

        if (!complexes || complexes.length === 0) {
            return [];
        }

        let res = await this.termsRepository.manager
            .getRepository(Term)
            .createQueryBuilder('term')
            .leftJoinAndSelect('term.court', 'court')
            .where('court.complex IN (:...complexes)', { complexes })
            .andWhere('term.date BETWEEN :start AND :end', { start: startOfMonth, end: endOfMonth })
            .addSelect('court.price', 'price')
            .addSelect('court.name', 'name')
            .getRawMany()

        return res;
    }

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

        let res = await this.getTermsByDateRange([complex], start, end)

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

        let topUser = await this.userService.getById(topPlayer.id);

        return {

            totalCount,
            courtsCount,
            totalAmount,
            amountPerWeek,
            user:
            {
                topUser,
                count: topPlayer.count
            }

        }
    }

    async weekStats(complex: number) {
        const [start, end] = this.thisWeek();

        var res = await this.getTermsByDateRange([complex], start, end)

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
            courtsCount,
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

        let res = await this.getTermsByDateRange(ids, startOfYear, endOfYear);


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
}