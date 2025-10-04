import { Court } from 'src/models/court.entity';
import { Repository } from 'typeorm';
export declare class CourtsService {
    private readonly courtRepository;
    constructor(courtRepository: Repository<Court>);
    getById(id: number): Promise<Court | null>;
    getByIdWithCourt(id: number): Promise<Court | null>;
    countCourtsByComplex(complexes: number[]): Promise<[Court[], number]>;
}
