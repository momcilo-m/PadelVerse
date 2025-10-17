import { BookingService } from './booking.service';
import { TermsCreateDTO } from 'src/models/term.create.dto';
export declare class BookingController {
    private readonly service;
    constructor(service: BookingService);
    checkout_session(req: any, dto: TermsCreateDTO): Promise<import("@nestjs/common").BadRequestException | import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>>;
}
