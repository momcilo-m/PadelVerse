import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Court } from 'src/models/court.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourtsService {

    constructor(
        @InjectRepository(Court) private readonly courtRepository:Repository<Court>
    ){}

    getById(id:number)
    {
        return this.courtRepository.findOneBy({id})
    }

}
