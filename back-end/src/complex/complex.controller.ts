import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComplexService } from './complex.service';
import { ComplexDTO } from 'src/models/complex.dto';

@Controller('complex')
export class ComplexController {

    constructor(private readonly service: ComplexService) {}

    @Get()
    getAllComplex(@Query()query:Record<string,any>)
    {
        console.log(query);
        return this.service.getAll(query);
    }

    @Get(':id')
    getById(@Param('id',ParseIntPipe)id:number)
    {
        return this.service.getById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createCourt(@Req()req:any, @Body(new ValidationPipe({transform:true}))complexDTO:ComplexDTO)
    {
        complexDTO.owner = req.user.id;
        return this.service.create(complexDTO)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    editCourt(@Req()req:any, @Body()complexDTO:ComplexDTO,@Param('id',ParseIntPipe)id:number)
    {
        complexDTO.owner = req.user.id;
        return this.service.edit(id,complexDTO);
    }
}
