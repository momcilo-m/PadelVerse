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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const complex_service_1 = require("./complex.service");
const complex_dto_1 = require("../models/complex.dto");
const court_dto_1 = require("../models/court.dto");
const courts_service_1 = require("../courts/courts.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = __importDefault(require("path"));
let ComplexController = class ComplexController {
    service;
    courtService;
    constructor(service, courtService) {
        this.service = service;
        this.courtService = courtService;
    }
    getFreeCourts(complex, startTime, date, count) {
        const dateQ = new Date(date);
        return this.service.freeCourts(complex, startTime, count, dateQ);
    }
    getAllComplex(query) {
        return this.service.getAll(query);
    }
    getById(id) {
        return this.service.getById(id);
    }
    createComplex(req, complexDTO) {
        complexDTO.owner = req.user.id;
        return this.service.create(complexDTO);
    }
    editCourt(req, complexDTO, id) {
        complexDTO.owner = req.user.id;
        return this.service.edit(id, complexDTO);
    }
    async createCourt(req, courtDTO) {
        let res = await this.courtService.createCourt(courtDTO);
        await this.service.editPrice(courtDTO.complex, courtDTO.price);
        return res;
    }
    uploadComplex(req, file, id) {
        return this.service.complexPhoto(file, id);
    }
};
exports.ComplexController = ComplexController;
__decorate([
    (0, common_1.Get)('free/:complex'),
    __param(0, (0, common_1.Param)('complex', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('time')),
    __param(2, (0, common_1.Query)('date')),
    __param(3, (0, common_1.Query)('count', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Number]),
    __metadata("design:returntype", void 0)
], ComplexController.prototype, "getFreeCourts", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComplexController.prototype, "getAllComplex", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ComplexController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, complex_dto_1.ComplexDTO]),
    __metadata("design:returntype", void 0)
], ComplexController.prototype, "createComplex", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, complex_dto_1.ComplexDTO, Number]),
    __metadata("design:returntype", void 0)
], ComplexController.prototype, "editCourt", null);
__decorate([
    (0, common_1.Post)("/courts"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, court_dto_1.CourtDTO]),
    __metadata("design:returntype", Promise)
], ComplexController.prototype, "createCourt", null);
__decorate([
    (0, common_1.Post)("/photo/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/photo/complex',
            filename: (req, file, cb) => {
                const uniqueName = req.user.first_name + '-' + Date.now() + path_1.default.extname(file.originalname);
                cb(null, uniqueName);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", void 0)
], ComplexController.prototype, "uploadComplex", null);
exports.ComplexController = ComplexController = __decorate([
    (0, common_1.Controller)('complex'),
    __metadata("design:paramtypes", [complex_service_1.ComplexService,
        courts_service_1.CourtsService])
], ComplexController);
//# sourceMappingURL=complex.controller.js.map