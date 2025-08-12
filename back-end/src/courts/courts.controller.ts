import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CourtsService } from './courts.service';
import { CourtDTO } from 'src/models/court.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
    @UseGuards(JwtAuthGuard)
    createCourt(@Req()req:any, @Body(new ValidationPipe({transform:true}))courtDTO:CourtDTO)
    {
        courtDTO.owner = req.user.id;
        return this.service.create(courtDTO)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    editCourt(@Req()req:any, @Body()courtDTO:CourtDTO,@Param('id',ParseIntPipe)id:number)
    {
        courtDTO.owner = req.user.id;
        return this.service.edit(id,courtDTO);
    }
}
