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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const typeorm_1 = require("typeorm");
const team_entity_1 = require("./team.entity");
const stats_entity_1 = require("./stats.entity");
let Match = class Match {
    id;
    team1;
    team2;
    match_stats;
    live;
};
exports.Match = Match;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Match.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team),
    (0, typeorm_1.JoinColumn)({ name: 'team1' }),
    __metadata("design:type", Number)
], Match.prototype, "team1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team),
    (0, typeorm_1.JoinColumn)({ name: 'team2' }),
    __metadata("design:type", Number)
], Match.prototype, "team2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.OneToOne)(() => stats_entity_1.Stats),
    (0, typeorm_1.JoinColumn)({ name: 'match_stats' }),
    __metadata("design:type", Number)
], Match.prototype, "match_stats", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Match.prototype, "live", void 0);
exports.Match = Match = __decorate([
    (0, typeorm_1.Entity)("matches")
], Match);
//# sourceMappingURL=match.entity.js.map