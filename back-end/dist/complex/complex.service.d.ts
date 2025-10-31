import { BadRequestException } from '@nestjs/common';
import { LocationService } from 'src/location/location.service';
import { ComplexDTO } from 'src/models/complex.dto';
import { Complex } from 'src/models/complex.entity';
import { Court } from 'src/models/court.entity';
import { TermsService } from 'src/terms/terms.service';
import { Repository } from 'typeorm';
export declare class ComplexService {
    private readonly complexRepository;
    private readonly courtRepository;
    private readonly termsService;
    private readonly locationService;
    constructor(complexRepository: Repository<Complex>, courtRepository: Repository<Court>, termsService: TermsService, locationService: LocationService);
    getAll(query: Record<string, any>): Promise<any>;
    getById(id: number): Promise<Complex | null>;
    getByUser(owner: number): Promise<Complex[]>;
    create(complexDTO: ComplexDTO): Promise<Complex | null>;
    edit(id: number, complexDTO: ComplexDTO): Promise<BadRequestException | Partial<Complex>>;
    freeCourts(id: number, start: string, count: number, date: Date): Promise<never[] | {
        all: Court[];
        available: number[];
    }>;
    complexPhoto(file: Express.Multer.File, id: number): Promise<{
        message: string;
        filename: string;
        path: string;
    }>;
    editPrice(id: number, price: number): Promise<void>;
    updateVote(id: number, rating: number, old: number): Promise<void>;
}
