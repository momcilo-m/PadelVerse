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
var SimulatorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorService = void 0;
const common_1 = require("@nestjs/common");
const events_gateway_1 = require("../events/events.gateway");
const events_service_1 = require("../events/events.service");
const match_service_1 = require("../match/match.service");
const stats_service_1 = require("../stats/stats.service");
const teams_service_1 = require("../teams/teams.service");
let SimulatorService = SimulatorService_1 = class SimulatorService {
    teamService;
    matchService;
    eventService;
    statService;
    eventsGateway;
    logger = new common_1.Logger(SimulatorService_1.name);
    constructor(teamService, matchService, eventService, statService, eventsGateway) {
        this.teamService = teamService;
        this.matchService = matchService;
        this.eventService = eventService;
        this.statService = statService;
        this.eventsGateway = eventsGateway;
    }
    async createMatch() {
        const [team1, team2] = await this.teamService.findNotPlayingTeams();
        if (!team1 || !team2)
            return;
        const stats = await this.statService.createStats(team1.id);
        return await this.matchService.createMatch(stats.id, team1.id, team2.id);
    }
    async events() {
        const matches = await this.matchService.getLiveMatch();
        await Promise.all(matches.map((match) => this.matchEvent(match)));
    }
    async matchEvent(match) {
        const event = this.eventService.generateRandomEvent();
        const stats = await this.statService.findById(match.match_stats);
        if (!stats)
            return;
        const [teamIndex, teamID, initId] = this.teamService.randomTeam(match, event, stats.currentServe);
        await this.statService.handleEvent(match.id, stats, teamIndex, match.team1, match.team2);
        let created_event = await this.eventService.createEvent(match.id, initId, event);
        this.eventsGateway.handleEvent(match.id, event, initId, created_event.id, stats);
    }
};
exports.SimulatorService = SimulatorService;
exports.SimulatorService = SimulatorService = SimulatorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [teams_service_1.TeamsService,
        match_service_1.MatchService,
        events_service_1.EventsService,
        stats_service_1.StatsService,
        events_gateway_1.EventsGateway])
], SimulatorService);
//# sourceMappingURL=simulator.service.js.map