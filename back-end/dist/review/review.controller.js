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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const complex_service_1 = require("../complex/complex.service");
const review_dto_1 = require("../models/review.dto");
const review_service_1 = require("./review.service");
let ReviewController = class ReviewController {
    service;
    complexService;
    constructor(service, complexService) {
        this.service = service;
        this.complexService = complexService;
    }
    async review(req, reviewComplex) {
        reviewComplex.user = req.user.id;
        let res = await this.service.review(reviewComplex);
        await this.complexService.updateVote(reviewComplex.complex, reviewComplex.rating, res.rating);
        res.rating = reviewComplex.rating;
        return res;
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, review_dto_1.ReviewDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "review", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService,
        complex_service_1.ComplexService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map