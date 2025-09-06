import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ComplexDTO } from 'src/models/complex.dto';
import { Complex } from 'src/models/complex.entity';
import { Court } from 'src/models/court.entity';
import { TermsService } from 'src/terms/terms.service';
import { QueryFeature } from 'src/Utils/QueryFeature';
import { In, Repository } from 'typeorm';

@Injectable()
export class ComplexService {

    constructor(
        @InjectRepository(Complex) private readonly complexRepository:Repository<Complex>,
        @InjectRepository(Court) private readonly courtRepository:Repository<Court>,
        @Inject(forwardRef(() => TermsService)) private readonly termsService: TermsService
    ){}

    async getAll(query:Record<string,any>)
    {
        return await new QueryFeature(this.complexRepository,query).filter().query
    }

    async getById(id:number)
    {
        return this.complexRepository
                .createQueryBuilder('complex')
                .leftJoin('complex.owner','users')
                .addSelect(['users.phone', 'users.email'])
                .where('complex.id=:id',{id})
                .getOne();
    }

    async getByIds(id:number[])
    {
        return this.complexRepository.find({
            where:{
                id:In(id)
            }
        })
    }

    async create(complexDTO:ComplexDTO)
    {
        return this.complexRepository.save(plainToClass(Complex,complexDTO));
    }

    async edit(id:number,complexDTO:ComplexDTO)
    {
        if(!complexDTO)
            return new BadRequestException('Please insert a valid data to edit');

        const updateData: Partial<Complex> = {};

        if (complexDTO.open_time !== undefined) updateData.open_time = complexDTO.open_time;
        if (complexDTO.close_time !== undefined) updateData.close_time = complexDTO.close_time;
        if (complexDTO.location !== undefined) updateData.location = complexDTO.location;
        if (complexDTO.name !== undefined) updateData.name = complexDTO.name;

        const court = await this.complexRepository.update({ id, owner: complexDTO.owner }, updateData);

        if(court.affected == 0)
            throw new NotFoundException('Court not found');

        return { success: true, message: 'Court updated successfully' };

    }

    async freeCourts(id:number,start:string,count:number,date:Date,)
    {
        date.setHours(0,0,0,0);
        const startTime = start;
        const endTime = (count + parseInt(start.split(":")[0])).toString().padStart(2,'0')+":00:00";

        const res: { all: Court[]; available: number[] } = {
            all: [],
            available: []
        };


        const courts = await this.courtRepository.find({
            where: { complex: { id } },
        });

        if(courts.length == 0)
            return [];

        res.all = courts;

        for(const court of courts)
        {
            try
            {
                await this.termsService.isTermFree(startTime,endTime,date,court.id)
                res.available.push(court.id)
            }
            catch(e)
            {

            }
        }

        return res;
    }
}
