import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsDTO } from 'src/models/tournament.dto';

@Controller('tournaments')
export class TournamentsController {

    constructor(private readonly tourService: TournamentsService) { };

    @Get()
    async getAllTournaments() {
        return this.tourService.getAll();
    }

    // @Post()
    // async createTournamet(@Body(new ValidationPipe({transform:true}))tourDTO:TournamentsDTO)
    // {
    //     return this.tourService.create(tourDTO);
    // }

}
