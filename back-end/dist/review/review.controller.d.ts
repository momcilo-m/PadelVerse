import { ComplexService } from 'src/complex/complex.service';
import { ReviewDTO } from 'src/models/review.dto';
import { ReviewService } from './review.service';
export declare class ReviewController {
    private readonly service;
    private readonly complexService;
    constructor(service: ReviewService, complexService: ComplexService);
    review(req: any, reviewComplex: ReviewDTO): Promise<import("../models/review.entity").Review>;
    getReview(req: any, complex: number): Promise<never[] | import("../models/review.entity").Review>;
}
