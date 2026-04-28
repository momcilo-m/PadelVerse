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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const team_entity_1 = require("../models/team.entity");
const typeorm_2 = require("typeorm");
const match_entity_1 = require("../models/match.entity");
const event_entity_1 = require("../models/event.entity");
let TeamsService = class TeamsService {
    teamRepo;
    constructor(teamRepo) {
        this.teamRepo = teamRepo;
    }
    async findNotPlayingTeams() {
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
            return [null, null];
        const [i1, i2] = this.randomIndex(availableTeams);
        return [availableTeams[i1], availableTeams[i2]];
    }
    randomIndex(array) {
        const i1 = Math.floor(Math.random() * array.length);
        let i2;
        do {
            i2 = Math.floor(Math.random() * array.length);
        } while (i2 === i1);
        return [i1, i2];
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
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TeamsService);
//# sourceMappingURL=teams.service.js.map