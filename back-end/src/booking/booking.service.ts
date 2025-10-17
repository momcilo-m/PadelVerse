import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Complex } from 'src/models/complex.entity';
import { Repository } from 'typeorm';
import { Court } from 'src/models/court.entity';
import { TermsService } from 'src/terms/terms.service';
import { TermsDTO } from 'src/models/term.dto';
import { format } from 'path';
import { TermsCreateDTO } from 'src/models/term.create.dto';

@Injectable()
export class BookingService {

    private stripe: Stripe;

    constructor(
        //@InjectRepository(Complex) private readonly complexRepository:Repository<Complex>,
        //forwardRef(() => TermsService)
        @InjectRepository(Court) private readonly courtRepository: Repository<Court>,
        @Inject() private readonly termsService: TermsService,
        private configService: ConfigService,
    ) {
        this.stripe = new Stripe(this.configService.get('STRIPE_KEY')!);
    }



    async checkout(dto: TermsCreateDTO, email: string) {

        const { complex, count, court: courtID } = dto;

        let court = await this.courtRepository.manager
            .getRepository(Court)
            .createQueryBuilder('court')
            .leftJoinAndSelect('court.complex', 'complex')
            .where('complex.id = :complex', { complex })
            .getOne()

        if (court == null) {
            return new BadRequestException("Court not found");
        }

        await this.termsService.create(dto)

        return await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: "http://localhost:4200/complex",
            cancel_url: "http://localhost:4200/maps",
            customer_email: email,
            client_reference_id: complex.toString(),
            mode: "payment",
            line_items: [
                {
                    price_data:
                    {
                        currency: "EUR",
                        product_data:
                        {
                            name: court.complex.name,
                            images: ["https://i.imgur.com/VjAuz15.jpeg"],
                        },
                        unit_amount: court.price * count * 100,
                    },
                    quantity: count
                }
            ],
            metadata:
            {
                court: courtID.toString(),
                complex: complex.toString()
            }
        })
    }

}
