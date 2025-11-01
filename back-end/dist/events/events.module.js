"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const events_gateway_1 = require("./events.gateway");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("../models/player.entity");
const team_entity_1 = require("../models/team.entity");
const match_entity_1 = require("../models/match.entity");
const fs_1 = require("fs");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([player_entity_1.Player, team_entity_1.Team, match_entity_1.Match, fs_1.Stats, Event])],
        providers: [events_gateway_1.EventsGateway],
        exports: [events_gateway_1.EventsGateway]
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map