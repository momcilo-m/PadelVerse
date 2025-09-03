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
exports.TermsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const complex_service_1 = require("../complex/complex.service");
const courts_service_1 = require("../courts/courts.service");
const term_entity_1 = require("../models/term.entity");
const typeorm_2 = require("typeorm");
let TermsService = class TermsService {
    termsRepository;
    courtService;
    complexService;
    constructor(termsRepository, courtService, complexService) {
        this.termsRepository = termsRepository;
        this.courtService = courtService;
        this.complexService = complexService;
    }
    async getByIds(court, user, start_date, end_date) {
        if (court == null && user == null)
            throw new common_1.BadRequestException('Please insert a court-id or user-id');
        let where = {};
        if (court)
            where.court = court;
        if (user)
            where.id = user;
        if (start_date)
            where.start_date = (0, typeorm_2.MoreThanOrEqual)(start_date);
        if (end_date)
            where.end_date = (0, typeorm_2.LessThanOrEqual)(end_date);
        return await this.termsRepository.find({ where });
    }
    async create(termsDTO) {
        const { time, count, date, court: cId } = termsDTO;
        date.setHours(0, 0, 0, 0);
        const startTime = time;
        const endTime = (count + parseInt(time.split(":")[0])).toString().padStart(2, '0') + ":00:00";
        const court = await this.courtService.getByIdWithCourt(cId);
        if (!court || !court.complex)
            throw new common_1.NotFoundException("Court not found");
        await this.isTermFree(startTime, endTime, date, court.complex, cId);
        return await this.termsRepository.save((0, class_transformer_1.plainToClass)(term_entity_1.Term, termsDTO));
    }
    async isTermFree(startTime, endTime, date, complex, court) {
        if (startTime < complex.open_time || endTime > complex.close_time) {
            throw new common_1.BadRequestException('Term must be within court working hours');
        }
        const overlapingTerms = await this.termsRepository.createQueryBuilder('term')
            .where('term.court = :court', { court })
            .andWhere('term.date = :date', { date })
            .andWhere(':startTime < (term.time + (term.count || \' hours\')::interval)', { startTime })
            .andWhere(':endTime > term.time', { endTime })
            .getMany();
        if (overlapingTerms.length > 0)
            throw new common_1.BadRequestException('Terms are intercepted');
    }
    async delete(id) {
        const terms = await this.termsRepository.findOneBy({ id });
        if (!terms)
            throw new common_1.NotFoundException(terms);
        const termTime = new Date(terms.date);
        const [hours] = terms.time.split(':').map(Number);
        termTime.setHours(hours);
        if (termTime.getTime() < Date.now())
            throw new common_1.BadRequestException('You can\'t delete term that past');
        return await this.termsRepository.delete({ id });
    }
};
exports.TermsService = TermsService;
exports.TermsService = TermsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(term_entity_1.Term)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        courts_service_1.CourtsService,
        complex_service_1.ComplexService])
], TermsService);
//# sourceMappingURL=terms.service.js.map