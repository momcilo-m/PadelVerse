import { ReviewDTO } from 'src/models/review.dto';
import { Review } from 'src/models/review.entity';
import { Repository } from 'typeorm';
export declare class ReviewService {
    private readonly repository;
    constructor(repository: Repository<Review>);
    review(reviewDTO: ReviewDTO): Promise<Review>;
    getReview(user: number, complex: number): Promise<Review | null>;
}
