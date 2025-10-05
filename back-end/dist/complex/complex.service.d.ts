import { BadRequestException } from '@nestjs/common';
import { ComplexDTO } from 'src/models/complex.dto';
import { Complex } from 'src/models/complex.entity';
import { Court } from 'src/models/court.entity';
import { TermsService } from 'src/terms/terms.service';
import { Repository } from 'typeorm';
export declare class ComplexService {
    private readonly complexRepository;
    private readonly courtRepository;
    private readonly termsService;
    constructor(complexRepository: Repository<Complex>, courtRepository: Repository<Court>, termsService: TermsService);
    getAll(query: Record<string, any>): Promise<any>;
    getById(id: number): Promise<Complex | null>;
    getByIds(id: number[]): Promise<Complex[]>;
    getByUser(owner: number): Promise<Complex[]>;
    create(complexDTO: ComplexDTO): Promise<Complex>;
    edit(id: number, complexDTO: ComplexDTO): Promise<BadRequestException | {
        success: boolean;
        message: string;
    }>;
    freeCourts(id: number, start: string, count: number, date: Date): Promise<never[] | {
        all: Court[];
        available: number[];
    }>;
}
