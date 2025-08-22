import { BadRequestException } from '@nestjs/common';
import { ComplexDTO } from 'src/models/complex.dto';
import { Complex } from 'src/models/complex.entity';
import { Repository } from 'typeorm';
export declare class ComplexService {
    private readonly complexRepository;
    constructor(complexRepository: Repository<Complex>);
    getAll(query: Record<string, any>): Promise<any>;
    getById(id: number): Promise<Complex | null>;
    getByIds(id: number[]): Promise<Complex[]>;
    create(complexDTO: ComplexDTO): Promise<Complex>;
    edit(id: number, complexDTO: ComplexDTO): Promise<BadRequestException | {
        success: boolean;
        message: string;
    }>;
}
