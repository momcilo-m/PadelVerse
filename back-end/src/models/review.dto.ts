import { IsPositive, Max, Min } from "class-validator"

export class ReviewDTO {
    @IsPositive()
    user: number

    @IsPositive()
    complex: number

    @Min(1, { message: "Rating must be at least 1" })
    @Max(5, { message: "Rating cannot be more than 5" })
    rating: number
}