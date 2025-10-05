import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CourtDTO } from 'src/models/court.dto';
import { Court } from 'src/models/court.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CourtsService {

    constructor(
        @InjectRepository(Court) private readonly courtRepository: Repository<Court>
    ) { }

    getById(id: number) {
        return this.courtRepository.findOneBy({ id })
    }

    getByIdWithCourt(id: number) {
        return this.courtRepository
            .createQueryBuilder('court')
            .leftJoinAndSelect('court.complex', 'complex')
            .where('court.id = :id', { id })
            .getOne();
    }

    countCourtsByComplex(complexes: number[]) {
        return this.courtRepository.findAndCountBy({ complex: In(complexes) })
    }

    async createCourt(courtDTO: CourtDTO) {
        return await this.courtRepository.save(plainToClass(Court, courtDTO));
    }
}
