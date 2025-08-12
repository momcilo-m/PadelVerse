import { TournamentsService } from './tournaments.service';
import { TournamentsDTO } from 'src/models/tournament.dto';
export declare class TournamentsController {
    private readonly tourService;
    constructor(tourService: TournamentsService);
    getAllTournaments(): Promise<import("../models/tournament.entity").Tournament[]>;
    createTournamet(tourDTO: TournamentsDTO): Promise<import("../models/tournament.entity").Tournament>;
}
