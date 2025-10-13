import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Complex } from 'src/models/complex.entity';
import { Repository } from 'typeorm';
import { Court } from 'src/models/court.entity';

@Injectable()
export class BookingService {

    private stripe: Stripe;

    constructor(
        //@InjectRepository(Complex) private readonly complexRepository:Repository<Complex>,
        @InjectRepository(Court) private readonly courtRepository: Repository<Court>,
        private configService: ConfigService
    ) {
        this.stripe = new Stripe(this.configService.get('STRIPE_KEY')!);
    }

    async checkout(complexID: number, courtID: number, count: number, email: string) {

        let court = await this.courtRepository.manager
            .getRepository(Court)
            .createQueryBuilder('court')
            .leftJoinAndSelect('court.complex', 'complex')
            .where('complex.id = :complexID', { complexID })
            .getOne()

        if (court == null) {
            return new BadRequestException("Court not found");
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
                    price_data:
                    {
                        currency: "EUR",
                        product_data:
                        {
                            name: court.complex.name,
                            images: ["image.png"],
                        },
                        unit_amount: court.price * count * 100,

                    },
                    quantity: count
                }
            ],
            metadata:
            {
                court: courtID.toString(),
                complex: complexID.toString()
            }
        })
    }

}
