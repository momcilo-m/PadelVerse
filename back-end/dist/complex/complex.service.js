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
const location_service_1 = require("../location/location.service");
const complex_entity_1 = require("../models/complex.entity");
const court_entity_1 = require("../models/court.entity");
const terms_service_1 = require("../terms/terms.service");
const QueryFeature_1 = require("../Utils/QueryFeature");
const typeorm_2 = require("typeorm");
let ComplexService = class ComplexService {
    complexRepository;
    courtRepository;
    termsService;
    locationService;
    constructor(complexRepository, courtRepository, termsService, locationService) {
        this.complexRepository = complexRepository;
        this.courtRepository = courtRepository;
        this.termsService = termsService;
        this.locationService = locationService;
    }
    async getAll(query) {
        return await new QueryFeature_1.QueryFeature(this.complexRepository, query).execute().query;
    }
    async getById(id) {
        let complex = await this.complexRepository
            .createQueryBuilder('complex')
            .leftJoin('complex.owner', 'users')
            .addSelect(['users.phone', 'users.email'])
            .where('complex.id=:id', { id }).getOne();
        if (complex === null)
            throw new common_1.NotFoundException("Complex not found");
        return complex;
    }
    async getByUser(owner) {
        return await this.complexRepository.findBy({ owner });
    }
    async create(complexDTO) {
        let { location: loc } = complexDTO;
        loc = loc.slice(1, loc.length - 1);
        let [lat, lng] = loc.split(",");
        let location = await this.locationService.reverseGeoCoding(+lat, +lng);
        complexDTO.city = location.city;
        complexDTO.country = location.country;
        const entity = this.complexRepository.create(complexDTO);
        const saved = await this.complexRepository.save(entity);
        return await this.complexRepository.findOne({ where: { id: saved.id } });
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
        if (complexDTO.city !== undefined)
            updateData.city = complexDTO.city;
        if (complexDTO.country !== undefined)
            updateData.country = complexDTO.country;
        const court = await this.complexRepository.update({ id, owner: complexDTO.owner }, updateData);
        if (court.affected == 0)
            throw new common_1.NotFoundException('Court not found');
        return updateData;
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
    async complexPhoto(file, id) {
        const updateData = {};
        updateData.photo = "complex/" + file.filename;
        const update = await this.complexRepository.update({ id }, updateData);
        if (update.affected == 0)
            throw new common_1.NotFoundException("User photo doesn't changed");
        return {
            message: 'You are successfully uploaded profile photo',
            filename: file.filename,
            path: `complex/${file.filename}`,
        };
    }
    async editPrice(id, price) {
        const complex = await this.complexRepository.findOneBy({ id });
        if (!complex)
            throw new Error("Complex not found");
        console.log(complex);
        if (price < complex.priceMin || price > complex.priceMax) {
            complex.priceMin = complex.priceMin === 0 ? price : Math.min(complex.priceMin, price);
            complex.priceMax = Math.max(complex.priceMax, price);
            delete complex.location;
            await this.complexRepository.save(complex);
        }
    }
    async updateVote(id, rating, old) {
        const complex = await this.complexRepository.findOneBy({ id });
        if (!complex)
            throw new common_1.NotFoundException("Complex not found");
        if (old == 0) {
            complex.votes += 1;
            complex.rating += rating;
        }
        else {
            complex.rating = complex.rating + old + rating;
        }
        await this.complexRepository.update(id, {
            rating: complex.rating,
            votes: complex.votes
        });
    }
};
exports.ComplexService = ComplexService;
exports.ComplexService = ComplexService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(complex_entity_1.Complex)),
    __param(1, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => terms_service_1.TermsService))),
    __param(3, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        terms_service_1.TermsService,
        location_service_1.LocationService])
], ComplexService);
//# sourceMappingURL=complex.service.js.map