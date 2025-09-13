import { Controller, Get, Param, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {

    constructor(private readonly service: BookingService) {}

    @Get("checkout-session")
    @UseGuards(JwtAuthGuard)
    checkout_session(
        @Req()req:any,
        @Query("complex",ParseIntPipe)complexId:number,
        @Query("court",ParseIntPipe)courtId:number,
        @Query("count",ParseIntPipe)count:number)
    {
        return this.service.checkout(complexId,courtId,count,req.user.email);
    }

}
