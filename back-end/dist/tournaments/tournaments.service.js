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
exports.TournamentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const complex_service_1 = require("../complex/complex.service");
const tournament_entity_1 = require("../models/tournament.entity");
const typeorm_2 = require("typeorm");
let TournamentsService = class TournamentsService {
    tourRepository;
    courtService;
    constructor(tourRepository, courtService) {
        this.tourRepository = tourRepository;
        this.courtService = courtService;
    }
    async getAll() {
        return await this.tourRepository.find();
    }
    async getByName(name) {
        return await this.tourRepository.findOneBy({ name });
    }
    async create(tournamentDTO) {
        const { country, city } = tournamentDTO;
        const courts = await this.courtService.getByIds(tournamentDTO.court);
        return await this.tourRepository.save((0, class_transformer_1.plainToClass)(tournament_entity_1.Tournament, { ...tournamentDTO, court: courts }));
    }
};
exports.TournamentsService = TournamentsService;
exports.TournamentsService = TournamentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tournament_entity_1.Tournament)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        complex_service_1.ComplexService])
], TournamentsService);
//# sourceMappingURL=tournaments.service.js.map