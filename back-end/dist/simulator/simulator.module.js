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
const event_entity_1 = require("../models/event.entity");
const match_entity_1 = require("../models/match.entity");
const player_entity_1 = require("../models/player.entity");
const stats_entity_1 = require("../models/stats.entity");
const team_entity_1 = require("../models/team.entity");
const simulator_service_1 = require("./simulator.service");
const events_module_1 = require("../events/events.module");
let SimulatorModule = class SimulatorModule {
};
exports.SimulatorModule = SimulatorModule;
exports.SimulatorModule = SimulatorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([player_entity_1.Player, team_entity_1.Team, match_entity_1.Match, stats_entity_1.Stats, event_entity_1.Event]), events_module_1.EventsModule],
        providers: [typeorm_1.TypeOrmModule, simulator_service_1.SimulatorService],
        controllers: [],
        exports: [simulator_service_1.SimulatorService]
    })
], SimulatorModule);
//# sourceMappingURL=simulator.module.js.map