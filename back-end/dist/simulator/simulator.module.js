"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("../models/player.entity");
const simulator_service_1 = require("./simulator.service");
const events_module_1 = require("../events/events.module");
const teams_module_1 = require("../teams/teams.module");
const match_module_1 = require("../match/match.module");
const stats_module_1 = require("../stats/stats.module");
let SimulatorModule = class SimulatorModule {
};
exports.SimulatorModule = SimulatorModule;
exports.SimulatorModule = SimulatorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([player_entity_1.Player]), stats_module_1.StatsModule, events_module_1.EventsModule, teams_module_1.TeamsModule, match_module_1.MatchModule],
        providers: [typeorm_1.TypeOrmModule, simulator_service_1.SimulatorService],
        controllers: [],
        exports: [simulator_service_1.SimulatorService]
    })
], SimulatorModule);
//# sourceMappingURL=simulator.module.js.map