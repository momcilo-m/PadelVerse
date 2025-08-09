import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CourtsService } from './courts.service';
import { CourtDTO } from 'src/models/court.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('courts')
export class CourtsController {

    constructor(private readonly service: CourtsService) {}
    

    @Get()
    getAllCourts()
    {
        return this.service.getAll();
    }

    @Get(':id')
    getById(@Param('id',ParseIntPipe)id:number)
    {
        return this.service.getById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    createCourt(@Req()req:any, @Body(new ValidationPipe({transform:true}))courtDTO:CourtDTO)
    {
        return this.service.create(courtDTO,req)
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    editCourt(@Req()req:any, @Body()courtDTO:CourtDTO,@Param('id',ParseIntPipe)id:number)
    {
        return this.service.edit(id,courtDTO,req);
    }
}
