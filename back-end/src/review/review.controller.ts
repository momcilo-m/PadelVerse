import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComplexService } from 'src/complex/complex.service';
import { ReviewDTO } from 'src/models/review.dto';
import { ReviewService } from './review.service';

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
}
