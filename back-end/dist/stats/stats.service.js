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
const complex_service_1 = require("../complex/complex.service");
const courts_service_1 = require("../courts/courts.service");
const match_service_1 = require("../match/match.service");
const stats_entity_1 = require("../models/stats.entity");
const terms_service_1 = require("../terms/terms.service");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
let StatsService = class StatsService {
    statsRepo;
    userService;
    complexService;
    courtsService;
    termSrevice;
    matchSrevice;
    constructor(statsRepo, userService, complexService, courtsService, termSrevice, matchSrevice) {
        this.statsRepo = statsRepo;
        this.userService = userService;
        this.complexService = complexService;
        this.courtsService = courtsService;
        this.termSrevice = termSrevice;
        this.matchSrevice = matchSrevice;
    }
    thisMonth() {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);
        return [startOfMonth, endOfMonth];
    }
    thisWeek() {
        const date = new Date();
        const day = date.getDay();
        const offsetDay = (day === 0 ? -6 : 1) - day;
        const monday = new Date();
        monday.setDate(date.getDate() + offsetDay);
        monday.setHours(0, 0, 0, 0);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);
        return [monday, sunday];
    }
    async monthStats(complex) {
        const [start, end] = this.thisMonth();
        let res = await this.termSrevice.getTermsByDateRange([complex], start, end);
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
        let formatted = [];
        amountPerWeek.forEach((el, index) => {
            formatted.push({ name: "Week " + (index + 1), value: el + index + 1 });
        });
        let topUser = await this.userService.getById(topPlayer.id);
        return {
            totalCount,
            courtsCount: Object.entries(courtsCount).map(([name, value]) => ({ name, value })),
            totalAmount,
            amountPerWeek: formatted,
            user: {
                topUser,
                count: topPlayer.count
            }
        };
    }
    async weekStats(complex) {
        const [start, end] = this.thisWeek();
        var res = await this.termSrevice.getTermsByDateRange([complex], start, end);
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
            totalCount,
            courtsCount: Object.entries(courtsCount).map(([name, value]) => ({ name, value })),
            totalAmount,
            todayCount,
            todayAmount
        };
    }
    getWeekInMonth(date) {
        const dt = new Date(date);
        const start = new Date(dt.getFullYear(), dt.getMonth(), 1);
        return Math.ceil((dt.getDate() + start.getDay()) / 7);
    }
    async globalStats(id) {
        let userComplexs = await this.complexService.getByUser(id);
        let ids = userComplexs.map(el => el.id);
        let noOfComplex = ids.length;
        let noOfCourts = (await this.courtsService.countCourtsByComplex(ids))[1];
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        let res = await this.termSrevice.getTermsByDateRange(ids, startOfYear, endOfYear);
        let noOfTerms = res.length;
        let totalAmount = 0;
        res.forEach(el => totalAmount += el.term_count * el.price);
        return {
            noOfComplex,
            noOfCourts,
            noOfTerms,
            totalAmount
        };
    }
    async createStats(currentServe) {
        const stats = this.statsRepo.create({ currentServe });
        return await this.statsRepo.save(stats);
    }
    handlePoint(stats, index) {
        let currentPoints = index ? stats.points_t2 : stats.points_t1;
        let currentPointsOpponent = index ? stats.points_t1 : stats.points_t2;
        let newCurrent;
        let newCurrentOpponent = "";
        let finishGame = false;
        let finishSet = false;
        let finishMatch = false;
        let newCurrentGame = -1;
        let newCurrentSet = -1;
        if (+currentPoints == 15)
            newCurrent = stats_entity_1.PointType.THIRTY;
        else if (+currentPoints == 30)
            newCurrent = stats_entity_1.PointType.FORTY;
        else if (+currentPoints == 40 && +currentPointsOpponent == 40) {
            newCurrent = stats_entity_1.PointType.ADVANTAGE;
            newCurrentOpponent = stats_entity_1.PointType.LOVE;
        }
        else if (+currentPoints == 40) {
            newCurrent = stats_entity_1.PointType.LOVE;
            newCurrentOpponent = stats_entity_1.PointType.LOVE;
            finishGame = true;
        }
        else if (currentPoints == stats_entity_1.PointType.ADVANTAGE) {
            newCurrent = stats_entity_1.PointType.LOVE;
            newCurrentOpponent = stats_entity_1.PointType.LOVE;
            finishGame = true;
        }
        else if (currentPoints == stats_entity_1.PointType.LOVE && currentPointsOpponent == stats_entity_1.PointType.ADVANTAGE) {
            newCurrent = stats_entity_1.PointType.FORTY;
            newCurrentOpponent = stats_entity_1.PointType.FORTY;
        }
        else
            newCurrent = stats_entity_1.PointType.FIFTEEN;
        if (finishGame) {
            let currentGames = index ? stats.game_t2 : stats.game_t1;
            newCurrentGame = ++currentGames;
            let currentOpponentGames = index ? stats.game_t1 : stats.game_t2;
            if (currentGames >= 6 && currentGames - currentOpponentGames >= 2) {
                let currentSets = index ? stats.set_t2 : stats.set_t1;
                newCurrentSet = ++currentSets;
                finishSet = true;
                if (currentSets == 2)
                    finishMatch = true;
            }
        }
        if (!index) {
            stats.points_t1 = newCurrent;
            if (newCurrentOpponent != "")
                stats.points_t2 = newCurrentOpponent;
            if (newCurrentGame != -1)
                stats.game_t1 = newCurrentGame;
            if (newCurrentSet != -1)
                stats.set_t1 = newCurrentSet;
        }
        else {
            stats.points_t2 = newCurrent;
            if (newCurrentOpponent != "")
                stats.points_t1 = newCurrentOpponent;
            if (newCurrentGame != -1)
                stats.game_t2 = newCurrentGame;
            if (newCurrentSet != -1)
                stats.set_t2 = newCurrentSet;
        }
        return [finishGame, finishSet, finishMatch];
    }
    async handleEvent(match_id, stats, index, team1, team2) {
        const [finishGame, finishSet, finishMatch] = this.handlePoint(stats, index);
        if (finishGame) {
            stats.currentServe = stats.currentServe == team1 ? team2 : team1;
        }
        await this.statsRepo.save(stats);
        if (finishMatch) {
            this.matchSrevice.finishMatch(match_id);
        }
    }
    async findById(id) {
        return await this.statsRepo.findOne({ where: { id } });
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stats_entity_1.Stats)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        complex_service_1.ComplexService,
        courts_service_1.CourtsService,
        terms_service_1.TermsService,
        match_service_1.MatchService])
], StatsService);
//# sourceMappingURL=stats.service.js.map