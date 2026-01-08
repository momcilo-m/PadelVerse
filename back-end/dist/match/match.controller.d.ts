import { MatchService } from './match.service';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    liveMatch(): Promise<import("../models/match.entity").Match[]>;
    statsForMatch(id: number): Promise<number | undefined>;
    getById(id: number): Promise<import("@nestjs/common").BadRequestException | {
        match: {
            id: number;
            team1: number;
            team2: number;
            live: boolean;
        };
        stats: number;
    }>;
    getEvents(id: number): Promise<import("../models/event.entity").Event[]>;
}
