import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingService } from './booking.service';
import { TermsDTO } from 'src/models/term.dto';
import { TermsCreateDTO } from 'src/models/term.create.dto';

@Controller('booking')
export class BookingController {

    constructor(private readonly service: BookingService) { }

    //create(@Body(new ValidationPipe({transform:true}))termsDTO:TermsCreateDTO)
    @UseGuards(JwtAuthGuard)
    @Post("checkout-session")
    checkout_session(
        @Req() req: any,
        @Body(new ValidationPipe({ transform: true })) dto: TermsCreateDTO
    ) {
        dto.user = req.user.id;
        return this.service.checkout(dto, req.user.email);
    }

    /*
 @Query("complex", ParseIntPipe) complexId: number,
        @Query("court", ParseIntPipe) courtId: number,
        @Query("count", ParseIntPipe) count: number,
        @Query("date") date: string
    */
}
