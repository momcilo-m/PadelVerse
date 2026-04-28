import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ReviewDTO } from 'src/models/review.dto';
import { Review } from 'src/models/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {

    constructor(
        @InjectRepository(Review) private readonly repository: Repository<Review>,
    ) { }

    async review(reviewDTO: ReviewDTO) {

        let review = await this.repository.findOne({ where: { complex: reviewDTO.complex, user: reviewDTO.user } })

        if (review == null) {

            let res = await this.repository.save(plainToClass(Review, reviewDTO));
            res.rating = 0;
            return res;
        }

        let oldVote = -review.rating;
        review.rating = reviewDTO.rating;

        await this.repository.save(review)

        review.rating = oldVote;

        return review;
    }

    async getReview(user: number, complex: number) {
        let res = await this.repository.findOneBy({ user, complex })

        return res ? res : [];
    }

}
