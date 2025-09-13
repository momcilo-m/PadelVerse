import { BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { Complex } from 'src/models/complex.entity';
import { Repository } from 'typeorm';
export declare class BookingService {
    private readonly complexRepository;
    private stripe;
    constructor(complexRepository: Repository<Complex>);
    checkout(complexID: number, courtID: number, count: number, email: string): Promise<BadRequestException | Stripe.Response<Stripe.Checkout.Session>>;
}
