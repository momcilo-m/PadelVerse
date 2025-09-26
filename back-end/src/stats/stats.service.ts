import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { max } from 'class-validator';
import { Term } from 'src/models/term.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {

    constructor(
        @InjectRepository(Term) private readonly termsRepository: Repository<Term>,
        //private readonly courtService:CourtsService,
        //@Inject(forwardRef(() => ComplexService)) private readonly complexService: ComplexService
    ){}


    private async getTermsByMonth(complex:number)
    {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        let res = await this.termsRepository.manager
        .getRepository(Term)
        .createQueryBuilder('term')
        .leftJoinAndSelect('term.court','court')
        .where('court.complex = :complex', { complex })
        .andWhere('term.date BETWEEN :start AND :end', { start: startOfMonth, end: endOfMonth })
        .addSelect('court.price','price')
        .addSelect('court.name','name')
        .getRawMany()

        return res;
    }

    async monthStats(complex:number)
    {

        var res = await this.getTermsByMonth(complex)

        let totalCount = 0;
        let courtsCount:Record<string,number>={} 
        let players:Record<number,number>={}
        let totalAmount = 0;
        let amountPerWeek: number[] = new Array(5).fill(0);

        res.forEach(el=>{
            totalCount += el.term_court;
            courtsCount[el.name] = (courtsCount[el.name] || 0) + 1;
            totalAmount += el.term_count * el.price
            players[el.term_user] = (players[el.term_user] || 0) + 1;
            let week = this.getWeekInMonth(el.term_date);
            amountPerWeek[week-1] += el.term_count * el.price
        })

        let topPlayer = Object.entries(players).reduce(
            (max, [id, count]) => count > max.count ? { id: Number(id), count } : max,
            { id: 0, count: 0 }
        );

        // console.log(totalCount,courtsCount,totalAmount,topPlayer,amountPerWeek)

        return {
            status:'success',
            data:{
                totalCount,
                courtsCount,
                totalAmount,
                amountPerWeek
            }
        }
    }


    async weekStats(complex:number)
    {
        var res = await this.getTermsByMonth(complex)

        let totalCount = 0;
        let totalAmount = 0;
        let courtsCount:Record<string,number>={} 
        let todayCount = 0;
        let todayAmount = 0;

        res.forEach(el=>{
            totalCount += el.term_court;
            totalAmount += el.term_count * el.price
            courtsCount[el.name] = (courtsCount[el.name] || 0) + 1;

            if(new Date(el.term_date).getDate() === new Date().getDate())
            {
                todayCount += el.term_court;
                todayAmount += el.term_count * el.price;
            }
        })

        // console.log(totalCount,courtsCount,totalAmount,todayCount,todayAmount)

        return {
            status:'success',
            data:{
                totalCount,
                courtsCount,
                totalAmount,
                todayCount,
                todayAmount
            }
        }
    }

    private getWeekInMonth(date:string):number
    {
        const dt = new Date(date);
        const start = new Date(dt.getFullYear(),dt.getMonth(),1);

        return Math.ceil((dt.getDate() + start.getDay())/7)
    }
}