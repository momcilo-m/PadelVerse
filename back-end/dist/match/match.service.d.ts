import { BadRequestException } from '@nestjs/common';
import { Match } from 'src/models/match.entity';
import { Repository } from 'typeorm';
export declare class MatchService {
    private readonly matchRepo;
    constructor(matchRepo: Repository<Match>);
    getLiveMatch(): Promise<Match[]>;
    getMatchById(id: number): Promise<BadRequestException | {
        match: {
            id: number;
            team1: number;
            team2: number;
            live: boolean;
        };
        stats: number;
    }>;
    getStats(id: number): Promise<number | undefined>;
    createMatch(match_stats: number, team1: number, team2: number): Promise<Match>;
    finishMatch(id: number): Promise<void>;
    getLiveMatchById(id: number): Promise<Match | null>;
}
