import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { TournamentsDTO } from 'src/models/tournament.dto';
import { Tournament } from 'src/models/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentsService {

    constructor(
        @InjectRepository(Tournament) private readonly tourRepository: Repository<Tournament>
    ){}

    async getAll()
    {
        return await this.tourRepository.find();
    } 

    async getByName(name:string)
    {
        return await this.tourRepository.findOneBy({name})
    }

    async create(tournamentDTO:TournamentsDTO)
    {
        //Provera da li grad i drzava postoje
        const {country,city} = tournamentDTO;

        return await this.tourRepository.save(plainToClass(Tournament,tournamentDTO));
    }
}
