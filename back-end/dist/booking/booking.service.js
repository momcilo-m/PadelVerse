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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = __importDefault(require("stripe"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const court_entity_1 = require("../models/court.entity");
let BookingService = class BookingService {
    courtRepository;
    stripe;
    constructor(courtRepository) {
        this.courtRepository = courtRepository;
        this.stripe = new stripe_1.default("sk_test_51S6EVACq02uHmIrCR176zUcaEW3j9OH0GZCIEBF0wA7eBtBQemofOtsvHsQjsyOjxWwXV0hhVhrawyoGj2Q93h8b00eg9IZGxz");
    }
    async checkout(complexID, courtID, count, email) {
        let court = await this.courtRepository.manager
            .getRepository(court_entity_1.Court)
            .createQueryBuilder('court')
            .leftJoinAndSelect('court.complex', 'complex')
            .where('complex.id = :complexID', { complexID })
            .getOne();
        if (court == null) {
            return new common_1.BadRequestException("Court not found");
        }
        return await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: "http://localhost:4200/complex",
            cancel_url: "http://localhost:4200/maps",
            customer_email: email,
            client_reference_id: complexID.toString(),
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "EUR",
                        product_data: {
                            name: court.complex.name,
                            images: ["image.png"],
                        },
                        unit_amount: court.price * count * 100,
                    },
                    quantity: count
                }
            ],
            metadata: {
                court: courtID.toString(),
                complex: complexID.toString()
            }
        });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingService);
//# sourceMappingURL=booking.service.js.map