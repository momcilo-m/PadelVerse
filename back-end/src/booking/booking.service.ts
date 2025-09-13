import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Complex } from 'src/models/complex.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {

    private stripe :Stripe;

    constructor(
        @InjectRepository(Complex) private readonly complexRepository:Repository<Complex>
    )
    {
        this.stripe = new Stripe("sk_test_51S6EVACq02uHmIrCR176zUcaEW3j9OH0GZCIEBF0wA7eBtBQemofOtsvHsQjsyOjxWwXV0hhVhrawyoGj2Q93h8b00eg9IZGxz");
    }
    
    async checkout(complexID:number, courtID:number, count:number,email:string)
    {
        let complex = await this.complexRepository.findOneBy({id:complexID})
        
        if(complex == null)
        {
            return new BadRequestException("Complex not found");
        }
    
        return await this.stripe.checkout.sessions.create({
            payment_method_types:['card'],
            success_url:"http://localhost:4200/complex",
            cancel_url:"http://localhost:4200/maps",
            customer_email:email,
            client_reference_id:complexID.toString(),
            mode:"payment",
            line_items:[
                {
                    price_data:
                    {
                        currency:"EUR",
                        product_data:
                        {
                            name:complex.name,
                            images:["image.png"],
                        },
                        unit_amount:complex.price * count * 100,
                        
                    },
                    quantity:count
                }
            ],
            metadata:
            {
                court:courtID.toString(),
                complex:complexID.toString()
            }
        })
    }

}
