import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ComplexService } from 'src/complex/complex.service';
import { CourtsService } from 'src/courts/courts.service';
import { TermsDTO } from 'src/models/term.dto';
import { Term } from 'src/models/term.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class TermsService {

    constructor(
        @InjectRepository(Term) private readonly termsRepository: Repository<Term>,
        private readonly courtService:CourtsService,
        private readonly complexService:ComplexService,
    ){}

    async getByIds(court?:number,user?:number,start_date?:Date, end_date?:Date)
    {
        if(court== null && user == null)
            throw new BadRequestException('Please insert a court-id or user-id');

        let where:any={};

        if(court) where.court = court;
        if(user) where.id = user;

        if(start_date)
            where.start_date = MoreThanOrEqual(start_date);

        if(end_date)
            where.end_date = LessThanOrEqual(end_date)

        return await this.termsRepository.find({where})
    }

    async create(termsDTO:TermsDTO)
    {
        const {time,count,date,court:cId} = termsDTO;
        date.setHours(0,0,0,0);

        const startTime = time;
        const endTime = (count + parseInt(time.split(":")[0])).toString().padStart(2,'0')+":00:00";

        const court = await this.courtService.getById(cId);

        if(!court)
            throw new NotFoundException('Court not found')

        const complex = await this.complexService.getById(court.complex)

        if(!complex)
            throw new NotFoundException('Comlpex not found')

        if (startTime < complex.open_time || endTime > complex.close_time) {
            throw new BadRequestException('Term must be within court working hours');
        }
        
        const overlapingTerms = await this.termsRepository.createQueryBuilder('term')
        .where('term.court = :court', { court: termsDTO.court })
        .andWhere('term.date = :date', { date })
        .andWhere(':startTime < (term.time + (term.count || \' hours\')::interval)', { startTime })
        .andWhere(':endTime > term.time', { endTime })
        .getMany();

        if(overlapingTerms.length > 0)
            throw new BadRequestException('Terms are intercepted')

        return await this.termsRepository.save(plainToClass(Term,termsDTO));
    }

    async delete(id:number)
    {
        const terms = await this.termsRepository.findOneBy({id});

        if(!terms)
            throw new NotFoundException(terms);

        const termTime = new Date(terms.date);
        const [hours] = terms.time.split(':').map(Number);
        termTime.setHours(hours);

        if(termTime.getTime() < Date.now())
            throw new BadRequestException('You can\'t delete term that past');

        return await this.termsRepository.delete({id})
    }
}
