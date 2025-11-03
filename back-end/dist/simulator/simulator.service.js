"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SimulatorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const events_gateway_1 = require("../events/events.gateway");
const event_entity_1 = require("../models/event.entity");
const match_entity_1 = require("../models/match.entity");
const stats_entity_1 = require("../models/stats.entity");
const team_entity_1 = require("../models/team.entity");
const typeorm_2 = require("typeorm");
let SimulatorService = SimulatorService_1 = class SimulatorService {
    matchRepo;
    eventRepo;
    teamRepo;
    statsRepo;
    eventsGateway;
    logger = new common_1.Logger(SimulatorService_1.name);
    constructor(matchRepo, eventRepo, teamRepo, statsRepo, eventsGateway) {
        this.matchRepo = matchRepo;
        this.eventRepo = eventRepo;
        this.teamRepo = teamRepo;
        this.statsRepo = statsRepo;
        this.eventsGateway = eventsGateway;
    }
    eventProbabilities = {
        [event_entity_1.EventType.ACE]: 0.1,
        [event_entity_1.EventType.DOUBLE_ERROR]: 0.05,
        [event_entity_1.EventType.POINT]: 0.5,
        [event_entity_1.EventType.ERROR]: 0.35
    };
    async createMatch() {
        const availableTeams = await this.teamRepo
            .createQueryBuilder('team')
            .where(qb => {
            const subQuery1 = qb.subQuery()
                .select('m.team1')
                .from(match_entity_1.Match, 'm')
                .where('m.live = true')
                .getQuery();
            const subQuery2 = qb.subQuery()
                .select('m.team2')
                .from(match_entity_1.Match, 'm')
                .where('m.live = true')
                .getQuery();
            return `team.id NOT IN ${subQuery1} AND team.id NOT IN ${subQuery2}`;
        })
            .getMany();
        if (availableTeams.length < 2)
            return;
        const [index1, index2] = this.randomIndex(availableTeams);
        const sts = this.statsRepo.create({ currentServe: availableTeams[index1].id });
        const stats = await this.statsRepo.save(sts);
        const mtch = this.matchRepo.create({ match_stats: stats.id, team1: availableTeams[index1].id, team2: availableTeams[index2].id });
        const match = await this.matchRepo.save(mtch);
        return match;
    }
    async events() {
        const matches = await this.matchRepo.findBy({ live: true });
        await Promise.all(matches.map((match) => this.matchEvent(match)));
    }
    async matchEvent(match) {
        const event = this.randomEvent();
        console.log(event, typeof event);
        const stats = await this.statsRepo.findOne({ where: { id: match.match_stats } });
        if (!stats)
            return;
        const [teamIndex, teamID, initId] = this.randomTeam(match, event, stats.currentServe);
        console.log("TIM", teamID, " je osvojio poen ", initId, " je generisao event ", event);
        const [finishGame, finishSet, finishMatch] = this.handlePoint(stats, teamIndex);
        if (finishGame) {
            stats.currentServe = stats.currentServe == match.team1 ? match.team2 : match.team1;
        }
        if (finishMatch) {
            match.live = false;
            await this.matchRepo.save(match);
        }
        await this.statsRepo.save(stats);
        let ev = this.eventRepo.create();
        ev.match = match.id;
        ev.team = initId;
        ev.event = event;
        let x = await this.eventRepo.save(ev);
        this.eventsGateway.handleEvent(match.id, event, initId, x.id, stats);
    }
    randomIndex(array) {
        const i1 = Math.floor(Math.random() * array.length);
        let i2;
        do {
            i2 = Math.floor(Math.random() * array.length);
        } while (i2 === i1);
        return [i1, i2];
    }
    randomEvent() {
        const events = Object.keys(this.eventProbabilities);
        const rand = Math.random();
        let cumulative = 0;
        for (const event of events) {
            const prob = this.eventProbabilities[event];
            cumulative += prob;
            if (rand < cumulative) {
                return event.toString();
            }
        }
        return event_entity_1.EventType.ERROR;
    }
    randomTeam(match, event, serve) {
        let id = 0;
        let index = 0;
        let idInit = 0;
        switch (event) {
            case event_entity_1.EventType.DOUBLE_ERROR:
                index = serve === match.team1 ? 1 : 0;
                id = serve === match.team1 ? match.team2 : match.team1;
                idInit = serve;
                break;
            case event_entity_1.EventType.ERROR:
                if (Math.random() < 0.5) {
                    idInit = match.team1;
                    id = match.team2;
                    index = 1;
                }
                else {
                    idInit = match.team2;
                    id = match.team1;
                    index = 0;
                }
                break;
            case event_entity_1.EventType.POINT:
                if (Math.random() < 0.5) {
                    id = match.team1;
                    idInit = match.team1;
                    index = 0;
                }
                else {
                    id = match.team2;
                    idInit = match.team2;
                    index = 1;
                }
                break;
            case event_entity_1.EventType.ACE:
                id = serve;
                idInit = serve;
                index = serve === match.team1 ? 0 : 1;
                break;
        }
        return [index, id, idInit];
    }
    handlePoint(stats, index) {
        let currentPoints = index ? stats.points_t2 : stats.points_t1;
        let currentPointsOpponent = index ? stats.points_t1 : stats.points_t2;
        let newCurrent;
        let newCurrentOpponent = "";
        let finishGame = false;
        let finishSet = false;
        let finishMatch = false;
        let newCurrentGame = -1;
        let newCurrentSet = -1;
        if (+currentPoints == 15)
            newCurrent = stats_entity_1.PointType.THIRTY;
        else if (+currentPoints == 30)
            newCurrent = stats_entity_1.PointType.FORTY;
        else if (+currentPoints == 40 && +currentPointsOpponent == 40) {
            newCurrent = stats_entity_1.PointType.ADVANTAGE;
            newCurrentOpponent = stats_entity_1.PointType.LOVE;
        }
        else if (+currentPoints == 40) {
            newCurrent = stats_entity_1.PointType.LOVE;
            newCurrentOpponent = stats_entity_1.PointType.LOVE;
            finishGame = true;
        }
        else if (currentPoints == stats_entity_1.PointType.ADVANTAGE) {
            newCurrent = stats_entity_1.PointType.LOVE;
            newCurrentOpponent = stats_entity_1.PointType.LOVE;
            finishGame = true;
        }
        else if (currentPoints == stats_entity_1.PointType.LOVE && currentPointsOpponent == stats_entity_1.PointType.ADVANTAGE) {
            newCurrent = stats_entity_1.PointType.FORTY;
            newCurrentOpponent = stats_entity_1.PointType.FORTY;
        }
        else
            newCurrent = stats_entity_1.PointType.FIFTEEN;
        if (finishGame) {
            let currentGames = index ? stats.game_t2 : stats.game_t1;
            newCurrentGame = ++currentGames;
            let currentOpponentGames = index ? stats.game_t1 : stats.game_t2;
            if (currentGames >= 6 && currentGames - currentOpponentGames >= 2) {
                let currentSets = index ? stats.set_t2 : stats.set_t1;
                newCurrentSet = ++currentSets;
                finishSet = true;
                if (currentSets == 2)
                    finishMatch = true;
            }
        }
        if (!index) {
            stats.points_t1 = newCurrent;
            if (newCurrentOpponent != "")
                stats.points_t2 = newCurrentOpponent;
            if (newCurrentGame != -1)
                stats.game_t1 = newCurrentGame;
            if (newCurrentSet != -1)
                stats.set_t1 = newCurrentSet;
        }
        else {
            stats.points_t2 = newCurrent;
            if (newCurrentOpponent != "")
                stats.points_t1 = newCurrentOpponent;
            if (newCurrentGame != -1)
                stats.game_t2 = newCurrentGame;
            if (newCurrentSet != -1)
                stats.set_t2 = newCurrentSet;
        }
        return [finishGame, finishSet, finishMatch];
    }
};
exports.SimulatorService = SimulatorService;
__decorate([
    (0, schedule_1.Cron)('*/10  * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SimulatorService.prototype, "events", null);
exports.SimulatorService = SimulatorService = SimulatorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(2, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __param(3, (0, typeorm_1.InjectRepository)(stats_entity_1.Stats)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        events_gateway_1.EventsGateway])
], SimulatorService);
//# sourceMappingURL=simulator.service.js.map