import { BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Court } from 'src/models/court.entity';
export declare class BookingService {
    private readonly courtRepository;
    private configService;
    private stripe;
    constructor(courtRepository: Repository<Court>, configService: ConfigService);
    checkout(complexID: number, courtID: number, count: number, email: string): Promise<BadRequestException | Stripe.Response<Stripe.Checkout.Session>>;
}
