import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { TermsService } from './terms.service';
import { TermsDTO } from 'src/models/terms.dto';

@Controller('terms')
export class TermsController {

    constructor(
        private readonly service:TermsService
    ){}

    @Get()
    getTermsByCourt(@Query('court',ParseIntPipe)court:number,@Query('user',ParseIntPipe)user:number,@Query('start')start:string,@Query('end')end:string)
    {
        return this.service.getByIds(court,user, new Date(start)?? null, new Date(end)?? null);
    }

    @Post()
    create(@Body(new ValidationPipe({transform:true}))termsDTO:TermsDTO)
    {
        return this.service.create(termsDTO);
    }
}
