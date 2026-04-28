import { Review } from "./review.entity";
export declare class Complex {
    id: number;
    name: string;
    location: string;
    owner: number;
    open_time: string;
    close_time: string;
    country: string;
    city: string;
    photo: string;
    rating: number;
    votes: number;
    priceMin: number;
    priceMax: number;
    reviews: Review[];
}
