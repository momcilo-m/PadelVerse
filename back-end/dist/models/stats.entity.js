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
exports.Stats = exports.PointType = void 0;
const typeorm_1 = require("typeorm");
const team_entity_1 = require("./team.entity");
var PointType;
(function (PointType) {
    PointType["LOVE"] = "0";
    PointType["FIFTEEN"] = "15";
    PointType["THIRTY"] = "30";
    PointType["FORTY"] = "40";
    PointType["ADVANTAGE"] = "AD";
})(PointType || (exports.PointType = PointType = {}));
let Stats = class Stats {
    id;
    set_t1;
    set_t2;
    game_t1;
    game_t2;
    points_t1;
    points_t2;
    currentServe;
};
exports.Stats = Stats;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Stats.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "set_t1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "set_t2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "game_t1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "game_t2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PointType,
    }),
    __metadata("design:type", String)
], Stats.prototype, "points_t1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PointType,
    }),
    __metadata("design:type", String)
], Stats.prototype, "points_t2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team),
    (0, typeorm_1.JoinColumn)({ name: 'currentServe' }),
    __metadata("design:type", Number)
], Stats.prototype, "currentServe", void 0);
exports.Stats = Stats = __decorate([
    (0, typeorm_1.Entity)("match_stats")
], Stats);
//# sourceMappingURL=stats.entity.js.map