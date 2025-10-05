import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComplexService } from './complex.service';
import { ComplexDTO } from 'src/models/complex.dto';
import { CourtDTO } from 'src/models/court.dto';
import { CourtsService } from 'src/courts/courts.service';

@Controller('complex')
export class ComplexController {

    constructor(
        private readonly service: ComplexService,
        private readonly courtService: CourtsService,
    ) { }

    @Get('free/:complex')
    getFreeCourts(
        @Param('complex', ParseIntPipe) complex: number,
        @Query('time') startTime: string,
        @Query('date') date: string,
        @Query('count', ParseIntPipe) count: number,
    ) {
        const dateQ = new Date(date);
        return this.service.freeCourts(complex, startTime, count, dateQ);
    }

    @Get()
    getAllComplex(@Query() query: Record<string, any>) {
        return this.service.getAll(query);
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.service.getById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createComplex(@Req() req: any, @Body(new ValidationPipe({ transform: true })) complexDTO: ComplexDTO) {
        complexDTO.owner = req.user.id;
        return this.service.create(complexDTO)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    editCourt(@Req() req: any, @Body() complexDTO: ComplexDTO, @Param('id', ParseIntPipe) id: number) {
        complexDTO.owner = req.user.id;
        return this.service.edit(id, complexDTO);
    }


    //Nije dobro zasticeno, moze bilo koji loginovan da upise court
    @Post("/courts")
    @UseGuards(JwtAuthGuard)
    createCourt(@Req() req: any, @Body() courtDTO: CourtDTO) {
        return this.courtService.createCourt(courtDTO)
    }
}
