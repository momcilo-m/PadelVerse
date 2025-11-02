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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("../models/event.entity");
const match_entity_1 = require("../models/match.entity");
const typeorm_2 = require("typeorm");
let MatchService = class MatchService {
    matchRepo;
    eventRepo;
    constructor(matchRepo, eventRepo) {
        this.matchRepo = matchRepo;
        this.eventRepo = eventRepo;
    }
    async getLiveMatch() {
        return await this.matchRepo.find({ where: { live: true }, relations: ['team1', 'team2'] });
    }
    async getMatchById(id) {
        const res = await this.matchRepo.findOne({ where: { id }, relations: ['match_stats', 'team1', 'team2'] });
        if (!res)
            return new common_1.BadRequestException("Not found");
        const { match_stats, ...cleanRes } = res;
        return {
            match: cleanRes,
            stats: match_stats
        };
    }
    async getStats(id) {
        return await this.matchRepo.findOne({ where: { id }, relations: ['match_stats'] });
    }
    async getEvents(id) {
        return await this.eventRepo.find({ where: { match: id }, order: { id: 'ASC' } });
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MatchService);
//# sourceMappingURL=match.service.js.map