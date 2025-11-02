"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchModule = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const match_controller_1 = require("./match.controller");
const match_entity_1 = require("../models/match.entity");
const typeorm_1 = require("@nestjs/typeorm");
const stats_entity_1 = require("../models/stats.entity");
const event_entity_1 = require("../models/event.entity");
let MatchModule = class MatchModule {
};
exports.MatchModule = MatchModule;
exports.MatchModule = MatchModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([match_entity_1.Match, stats_entity_1.Stats, event_entity_1.Event])],
        providers: [match_service_1.MatchService],
        controllers: [match_controller_1.MatchController]
    })
], MatchModule);
//# sourceMappingURL=match.module.js.map