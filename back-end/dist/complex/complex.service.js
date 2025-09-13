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
exports.ComplexService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const complex_entity_1 = require("../models/complex.entity");
const court_entity_1 = require("../models/court.entity");
const terms_service_1 = require("../terms/terms.service");
const QueryFeature_1 = require("../Utils/QueryFeature");
const typeorm_2 = require("typeorm");
let ComplexService = class ComplexService {
    complexRepository;
    courtRepository;
    termsService;
    constructor(complexRepository, courtRepository, termsService) {
        this.complexRepository = complexRepository;
        this.courtRepository = courtRepository;
        this.termsService = termsService;
    }
    async getAll(query) {
        return await new QueryFeature_1.QueryFeature(this.complexRepository, query).filter().query;
    }
    async getById(id) {
        return await this.complexRepository
            .createQueryBuilder('complex')
            .leftJoin('complex.owner', 'users')
            .addSelect(['users.phone', 'users.email'])
            .where('complex.id=:id', { id })
            .getOne();
    }
    async getByIds(id) {
        return await this.complexRepository.find({
            where: {
                id: (0, typeorm_2.In)(id)
            }
        });
    }
    async create(complexDTO) {
        return await this.complexRepository.save((0, class_transformer_1.plainToClass)(complex_entity_1.Complex, complexDTO));
    }
    async edit(id, complexDTO) {
        if (!complexDTO)
            return new common_1.BadRequestException('Please insert a valid data to edit');
        const updateData = {};
        if (complexDTO.open_time !== undefined)
            updateData.open_time = complexDTO.open_time;
        if (complexDTO.close_time !== undefined)
            updateData.close_time = complexDTO.close_time;
        if (complexDTO.location !== undefined)
            updateData.location = complexDTO.location;
        if (complexDTO.name !== undefined)
            updateData.name = complexDTO.name;
        const court = await this.complexRepository.update({ id, owner: complexDTO.owner }, updateData);
        if (court.affected == 0)
            throw new common_1.NotFoundException('Court not found');
        return { success: true, message: 'Court updated successfully' };
    }
    async freeCourts(id, start, count, date) {
        date.setHours(0, 0, 0, 0);
        const startTime = start;
        const endTime = (count + parseInt(start.split(":")[0])).toString().padStart(2, '0') + ":00:00";
        const res = {
            all: [],
            available: []
        };
        const courts = await this.courtRepository.find({
            where: { complex: { id } },
        });
        if (courts.length == 0)
            return [];
        res.all = courts;
        for (const court of courts) {
            try {
                await this.termsService.isTermFree(startTime, endTime, date, court.id);
                res.available.push(court.id);
            }
            catch (e) {
            }
        }
        return res;
    }
};
exports.ComplexService = ComplexService;
exports.ComplexService = ComplexService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(complex_entity_1.Complex)),
    __param(1, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => terms_service_1.TermsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        terms_service_1.TermsService])
], ComplexService);
//# sourceMappingURL=complex.service.js.map