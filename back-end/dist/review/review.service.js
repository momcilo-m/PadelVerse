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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const review_entity_1 = require("../models/review.entity");
const typeorm_2 = require("typeorm");
let ReviewService = class ReviewService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async review(reviewDTO) {
        let review = await this.repository.findOne({ where: { complex: reviewDTO.complex, user: reviewDTO.user } });
        if (review == null) {
            let res = await this.repository.save((0, class_transformer_1.plainToClass)(review_entity_1.Review, reviewDTO));
            res.rating = 0;
            console.log("NOVO", res);
            return res;
        }
        let oldVote = -review.rating;
        review.rating = reviewDTO.rating;
        console.log("a");
        await this.repository.save(review);
        console.log("STARO PRE", review);
        review.rating = oldVote;
        console.log("STARO POSLE", review);
        return review;
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=review.service.js.map