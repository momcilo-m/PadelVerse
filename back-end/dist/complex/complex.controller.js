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
exports.ComplexController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const complex_service_1 = require("./complex.service");
const complex_dto_1 = require("../models/complex.dto");
let ComplexController = class ComplexController {
    service;
    constructor(service) {
        this.service = service;
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
    createCourt(req, complexDTO) {
        complexDTO.owner = req.user.id;
        return this.service.create(complexDTO);
    }
    editCourt(req, complexDTO, id) {
        complexDTO.owner = req.user.id;
        return this.service.edit(id, complexDTO);
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
], ComplexController.prototype, "createCourt", null);
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
exports.ComplexController = ComplexController = __decorate([
    (0, common_1.Controller)('complex'),
    __metadata("design:paramtypes", [complex_service_1.ComplexService])
], ComplexController);
//# sourceMappingURL=complex.controller.js.map