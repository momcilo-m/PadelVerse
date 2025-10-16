import { TournamentsService } from './tournaments.service';
export declare class TournamentsController {
    private readonly tourService;
    constructor(tourService: TournamentsService);
    getAllTournaments(): Promise<import("../models/tournament.entity").Tournament[]>;
}
