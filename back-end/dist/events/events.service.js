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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("../models/event.entity");
const typeorm_2 = require("typeorm");
let EventsService = class EventsService {
    repository;
    eventProbabilities = {
        [event_entity_1.EventType.ACE]: 0.1,
        [event_entity_1.EventType.DOUBLE_ERROR]: 0.05,
        [event_entity_1.EventType.POINT]: 0.5,
        [event_entity_1.EventType.ERROR]: 0.35
    };
    constructor(repository) {
        this.repository = repository;
    }
    generateRandomEvent() {
        const events = Object.keys(this.eventProbabilities);
        const rand = Math.random();
        let cumulative = 0;
        for (const event of events) {
            const prob = this.eventProbabilities[event];
            cumulative += prob;
            if (rand < cumulative) {
                return event.toString();
            }
        }
        return event_entity_1.EventType.ERROR;
    }
    async createEvent(match, team, event) {
        let ev = this.repository.create({ match, team, event });
        return await this.repository.save(ev);
    }
    async getEvents(id) {
        return await this.repository.find({ where: { match: id }, order: { id: 'ASC' } });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map