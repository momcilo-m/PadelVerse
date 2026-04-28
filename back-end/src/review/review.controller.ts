import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComplexService } from 'src/complex/complex.service';
import { ReviewDTO } from 'src/models/review.dto';
import { ReviewService } from './review.service';
import { User } from 'src/models/user.entity';

@Controller('review')
export class ReviewController {

    constructor(
        private readonly service: ReviewService,
        private readonly complexService: ComplexService,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async review(@Req() req: any, @Body() reviewComplex: ReviewDTO) {
        reviewComplex.user = req.user.id;

        let res = await this.service.review(reviewComplex);

        await this.complexService.updateVote(reviewComplex.complex, reviewComplex.rating, res!.rating);

        res.rating = reviewComplex.rating

        return res;
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:complex")
    async getReview(@Req() req: any, @Param('complex', ParseIntPipe) complex: number) {
        return await this.service.getReview(req.user.id, complex);
    }
}
