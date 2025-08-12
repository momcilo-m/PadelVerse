import { BadRequestException } from '@nestjs/common';
import { CourtDTO } from 'src/models/court.dto';
import { Court } from 'src/models/court.entity';
import { Repository } from 'typeorm';
export declare class CourtsService {
    private readonly courtsRepository;
    constructor(courtsRepository: Repository<Court>);
    getAll(): Promise<Court[]>;
    getById(id: number): Promise<Court | null>;
    create(courtDTO: CourtDTO): Promise<Court>;
    edit(id: number, courtDTO: CourtDTO): Promise<BadRequestException | {
        success: boolean;
        message: string;
    }>;
}
