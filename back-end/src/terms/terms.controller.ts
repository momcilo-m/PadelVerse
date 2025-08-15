import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { TermsService } from './terms.service';
import { TermsDTO } from 'src/models/term.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body(new ValidationPipe({transform:true}))termsDTO:TermsDTO)
    {
        return this.service.create(termsDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    delete(@Param('id',ParseIntPipe)id:number)
    {
        return this.service.delete(id);
    }
}
