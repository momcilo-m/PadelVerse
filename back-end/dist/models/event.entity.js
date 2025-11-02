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
exports.Event = exports.EventType = void 0;
const typeorm_1 = require("typeorm");
const team_entity_1 = require("./team.entity");
const match_entity_1 = require("./match.entity");
var EventType;
(function (EventType) {
    EventType["POINT"] = "point";
    EventType["ACE"] = "ace";
    EventType["DOUBLE_ERROR"] = "double_error";
    EventType["ERROR"] = "error";
})(EventType || (exports.EventType = EventType = {}));
let Event = class Event {
    id;
    match;
    team;
    event;
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.OneToOne)(() => match_entity_1.Match),
    (0, typeorm_1.JoinColumn)({ name: 'match' }),
    __metadata("design:type", Number)
], Event.prototype, "match", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team),
    (0, typeorm_1.JoinColumn)({ name: 'team' }),
    __metadata("design:type", Number)
], Event.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EventType,
        enumName: 'event_values'
    }),
    __metadata("design:type", String)
], Event.prototype, "event", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)("match_events")
], Event);
//# sourceMappingURL=event.entity.js.map