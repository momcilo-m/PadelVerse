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
exports.TermsController = void 0;
const common_1 = require("@nestjs/common");
const terms_service_1 = require("./terms.service");
const term_dto_1 = require("../models/term.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TermsController = class TermsController {
    service;
    constructor(service) {
        this.service = service;
    }
    getTermsByCourt(court, user, start, end) {
        return this.service.getByIds(court, user, new Date(start) ?? null, new Date(end) ?? null);
    }
    create(termsDTO) {
        return this.service.create(termsDTO);
    }
    delete(id) {
        return this.service.delete(id);
    }
};
exports.TermsController = TermsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('court', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('user', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('start')),
    __param(3, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], TermsController.prototype, "getTermsByCourt", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [term_dto_1.TermsDTO]),
    __metadata("design:returntype", void 0)
], TermsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TermsController.prototype, "delete", null);
exports.TermsController = TermsController = __decorate([
    (0, common_1.Controller)('terms'),
    __metadata("design:paramtypes", [terms_service_1.TermsService])
], TermsController);
//# sourceMappingURL=terms.controller.js.map