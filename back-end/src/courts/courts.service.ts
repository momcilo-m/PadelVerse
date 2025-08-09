import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CourtDTO } from 'src/models/court.dto';
import { Court } from 'src/models/court.entity';
import { Repository } from 'typeorm';
import {Request} from 'express'

@Injectable()
export class CourtsService {

    constructor(
        @InjectRepository(Court) private readonly courtsRepository:Repository<Court>,
    ){}

    async getAll()
    {
        return this.courtsRepository.find();
    }

    async getById(id:number)
    {
        return this.courtsRepository
                .createQueryBuilder('courts')
                .leftJoin('courts.owner','users')
                .addSelect(['users.phone', 'users.email'])
                .where('courts.id=:id',{id})
                .getOne();
    }

    async create(courtDTO:CourtDTO,req:Request)
    {
        courtDTO.owner = req.user.id;
        return this.courtsRepository.save(plainToClass(Court,courtDTO));
    }

    async edit(id:number,courtDTO:CourtDTO,req:Request)
    {
        if(!courtDTO)
            return new BadRequestException('Please insert a valid data to edit');

        const updateData: Partial<Court> = {};

        if (courtDTO.open_time !== undefined) updateData.open_time = courtDTO.open_time;
        if (courtDTO.close_time !== undefined) updateData.close_time = courtDTO.close_time;
        if (courtDTO.location !== undefined) updateData.location = courtDTO.location;
        if (courtDTO.name !== undefined) updateData.name = courtDTO.name;

        const court = await this.courtsRepository.update({ id, owner: req.user.id }, updateData);

        if(court.affected == 0)
            throw new NotFoundException('Court not found');

        return { success: true, message: 'Court updated successfully' };

    }
}
