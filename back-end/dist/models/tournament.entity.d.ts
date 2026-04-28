import { Complex } from "./complex.entity";
export declare class Tournament {
    id: number;
    name: string;
    start: Date;
    end: Date;
    country: string;
    city: string;
    complex: Complex;
}
