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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
let MatchController = class MatchController {
    matchService;
    constructor(matchService) {
        this.matchService = matchService;
    }
    async liveMatch() {
        return this.matchService.getLiveMatch();
    }
    async statsForMatch(id) {
        return this.matchService.getStats(id);
    }
    async getById(id) {
        return this.matchService.getMatchById(id);
    }
    async getEvents(id) {
        return this.matchService.getEvents(id);
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Get)("live"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "liveMatch", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "statsForMatch", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(":id/events"),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "getEvents", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)('match'),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], MatchController);
//# sourceMappingURL=match.controller.js.map