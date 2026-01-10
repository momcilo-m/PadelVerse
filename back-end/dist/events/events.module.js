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
const events_controller_1 = require("./events.controller");
const teams_module_1 = require("../teams/teams.module");
const match_module_1 = require("../match/match.module");
const events_service_1 = require("./events.service");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Event]), teams_module_1.TeamsModule, match_module_1.MatchModule],
        providers: [events_gateway_1.EventsGateway, events_service_1.EventsService],
        exports: [events_gateway_1.EventsGateway, events_service_1.EventsService],
        controllers: [events_controller_1.EventsController]
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map