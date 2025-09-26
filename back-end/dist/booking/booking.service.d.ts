import { BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Court } from 'src/models/court.entity';
export declare class BookingService {
    private readonly courtRepository;
    private stripe;
    constructor(courtRepository: Repository<Court>);
    checkout(complexID: number, courtID: number, count: number, email: string): Promise<BadRequestException | Stripe.Response<Stripe.Checkout.Session>>;
}
