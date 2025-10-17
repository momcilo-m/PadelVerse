import { BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Court } from 'src/models/court.entity';
import { TermsService } from 'src/terms/terms.service';
import { TermsCreateDTO } from 'src/models/term.create.dto';
export declare class BookingService {
    private readonly courtRepository;
    private readonly termsService;
    private configService;
    private stripe;
    constructor(courtRepository: Repository<Court>, termsService: TermsService, configService: ConfigService);
    checkout(dto: TermsCreateDTO, email: string): Promise<BadRequestException | Stripe.Response<Stripe.Checkout.Session>>;
}
