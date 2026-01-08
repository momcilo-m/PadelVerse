import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { EventsGateway } from "src/events/events.gateway";
import { Event, EventType } from "src/models/event.entity";
import { Match } from "src/models/match.entity";
import { PointType, Stats } from "src/models/stats.entity";
import { Team } from "src/models/team.entity";
import { Repository } from "typeorm";

@Injectable()
export class SimulatorService {
    private readonly logger = new Logger(SimulatorService.name);

    constructor(
        @InjectRepository(Match) private readonly matchRepo: Repository<Match>,
        @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
        @InjectRepository(Team) private readonly teamRepo: Repository<Team>,
        @InjectRepository(Stats) private readonly statsRepo: Repository<Stats>,
        private eventsGateway: EventsGateway
    ) { }

    private eventProbabilities: Record<EventType, number> = {
        [EventType.ACE]: 0.1,           // 10%
        [EventType.DOUBLE_ERROR]: 0.05, // 5%
        [EventType.POINT]: 0.5,         // 50%
        [EventType.ERROR]: 0.35         // 35%
    };

    //@Cron('*/1 * * * *')
    async createMatch() {
        //1. Izaberi dva razlicita tima koji trenutno ne igraju
        const availableTeams = await this.teamRepo
            .createQueryBuilder('team')
            .where(qb => {
                const subQuery1 = qb.subQuery()
                    .select('m.team1')
                    .from(Match, 'm')
                    .where('m.live = true')
                    .getQuery();

                const subQuery2 = qb.subQuery()
                    .select('m.team2')
                    .from(Match, 'm')
                    .where('m.live = true')
                    .getQuery();

                return `team.id NOT IN ${subQuery1} AND team.id NOT IN ${subQuery2}`;
            })
            .getMany();

        if (availableTeams.length < 2)
            return;

        const [index1, index2] = this.randomIndex(availableTeams);

        //2. Izracunaj verovatnocu za pobedu tima

        //3. Kreiraj match stats

        const sts = this.statsRepo.create({ currentServe: availableTeams[index1].id });
        const stats = await this.statsRepo.save(sts);

        //4. Kreiraj match 
        const mtch = this.matchRepo.create({ match_stats: stats.id, team1: availableTeams[index1].id, team2: availableTeams[index2].id });
        const match = await this.matchRepo.save(mtch);
        return match;

    }

    //@Cron('*/10  * * * * *')
    async events() {

        const matches = await this.matchRepo.findBy({ live: true });

        await Promise.all(matches.map((match) => this.matchEvent(match)));
    }

    async matchEvent(match: Match) {

        //1. nasumicno generisi events
        const event = this.randomEvent();
        //console.log(event, typeof event)


        //2. izaberi koji tim je generisao event
        const stats = await this.statsRepo.findOne({ where: { id: match.match_stats } });
        if (!stats) return;

        const [teamIndex, teamID, initId] = this.randomTeam(match, event, stats!.currentServe);
        //console.log("TIM", teamID, " je osvojio poen ", initId, " je generisao event ", event)
        
        //3. azuriraj statistiku
        const [finishGame, finishSet, finishMatch] = this.handlePoint(stats, teamIndex);

        if (finishGame) {
            stats.currentServe = stats.currentServe == match.team1 ? match.team2 : match.team1;
        }

        if (finishMatch) {
            match.live = false;
            await this.matchRepo.save(match);
        }

        await this.statsRepo.save(stats);

        //console.log(match.id, initId, event);


        let ev = this.eventRepo.create();
        ev.match = match.id;
        ev.team = initId;
        ev.event = event as EventType

        let x = await this.eventRepo.save(ev);

        //Slanje poruke
        this.eventsGateway.handleEvent(match.id, event, initId, x.id, stats);
    }

    private randomIndex(array: Team[]) {
        const i1 = Math.floor(Math.random() * array.length);
        let i2: number;
        do {
            i2 = Math.floor(Math.random() * array.length);
        } while (i2 === i1);

        return [i1, i2];
    }

    private randomEvent() {
        const events = Object.keys(this.eventProbabilities) as unknown as EventType[];
        const rand = Math.random();
        let cumulative = 0;

        for (const event of events) {
            const prob = this.eventProbabilities[event];
            cumulative += prob;
            if (rand < cumulative) {
                return event.toString();
            }
        }

        return EventType.ERROR;
    }

    //Da li je prvi ili drugi tim i njegov id i inicijator eventa
    private randomTeam(match: Match, event: string, serve: number): number[] {

        let id: number = 0;
        let index: number = 0;
        let idInit: number = 0;

        switch (event) {
            case EventType.DOUBLE_ERROR:
                index = serve === match.team1 ? 1 : 0;
                id = serve === match.team1 ? match.team2 : match.team1;
                idInit = serve;// === match.team1 ? match.team1 : match.team2;
                break;

            case EventType.ERROR:

                if (Math.random() < 0.5) {
                    idInit = match.team1;
                    id = match.team2;
                    index = 1;
                } else {
                    idInit = match.team2;
                    id = match.team1;
                    index = 0;
                }

                break;

            case EventType.POINT:
                if (Math.random() < 0.5) {
                    id = match.team1;
                    idInit = match.team1;
                    index = 0;
                } else {
                    id = match.team2;
                    idInit = match.team2;
                    index = 1;
                }

                break;

            case EventType.ACE:

                id = serve;
                idInit = serve;
                index = serve === match.team1 ? 0 : 1;

                break;
        }

        return [index, id, idInit];
    }

    //Trazi index tima
    private handlePoint(stats: Stats, index: number) {

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
}