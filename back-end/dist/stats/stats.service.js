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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const term_entity_1 = require("../models/term.entity");
const typeorm_2 = require("typeorm");
let StatsService = class StatsService {
    termsRepository;
    constructor(termsRepository) {
        this.termsRepository = termsRepository;
    }
    async getTermsByMonth(complex) {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);
        let res = await this.termsRepository.manager
            .getRepository(term_entity_1.Term)
            .createQueryBuilder('term')
            .leftJoinAndSelect('term.court', 'court')
            .where('court.complex = :complex', { complex })
            .andWhere('term.date BETWEEN :start AND :end', { start: startOfMonth, end: endOfMonth })
            .addSelect('court.price', 'price')
            .addSelect('court.name', 'name')
            .getRawMany();
        return res;
    }
    async monthStats(complex) {
        var res = await this.getTermsByMonth(complex);
        let totalCount = 0;
        let courtsCount = {};
        let players = {};
        let totalAmount = 0;
        let amountPerWeek = new Array(5).fill(0);
        res.forEach(el => {
            totalCount += el.term_court;
            courtsCount[el.name] = (courtsCount[el.name] || 0) + 1;
            totalAmount += el.term_count * el.price;
            players[el.term_user] = (players[el.term_user] || 0) + 1;
            let week = this.getWeekInMonth(el.term_date);
            amountPerWeek[week - 1] += el.term_count * el.price;
        });
        let topPlayer = Object.entries(players).reduce((max, [id, count]) => count > max.count ? { id: Number(id), count } : max, { id: 0, count: 0 });
        return {
            status: 'success',
            data: {
                totalCount,
                courtsCount,
                totalAmount,
                amountPerWeek
            }
        };
    }
    async weekStats(complex) {
        var res = await this.getTermsByMonth(complex);
        let totalCount = 0;
        let totalAmount = 0;
        let courtsCount = {};
        let todayCount = 0;
        let todayAmount = 0;
        res.forEach(el => {
            totalCount += el.term_court;
            totalAmount += el.term_count * el.price;
            courtsCount[el.name] = (courtsCount[el.name] || 0) + 1;
            if (new Date(el.term_date).getDate() === new Date().getDate()) {
                todayCount += el.term_court;
                todayAmount += el.term_count * el.price;
            }
        });
        return {
            status: 'success',
            data: {
                totalCount,
                courtsCount,
                totalAmount,
                todayCount,
                todayAmount
            }
        };
    }
    getWeekInMonth(date) {
        const dt = new Date(date);
        const start = new Date(dt.getFullYear(), dt.getMonth(), 1);
        return Math.ceil((dt.getDate() + start.getDay()) / 7);
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(term_entity_1.Term)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StatsService);
//# sourceMappingURL=stats.service.js.map