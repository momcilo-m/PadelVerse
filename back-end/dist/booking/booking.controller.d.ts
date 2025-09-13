import { BookingService } from './booking.service';
export declare class BookingController {
    private readonly service;
    constructor(service: BookingService);
    checkout_session(req: any, complexId: number, courtId: number, count: number): Promise<import("@nestjs/common").BadRequestException | import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>>;
}
