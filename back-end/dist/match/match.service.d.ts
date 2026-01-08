import { BadRequestException } from '@nestjs/common';
import { Event } from 'src/models/event.entity';
import { Match } from 'src/models/match.entity';
import { Repository } from 'typeorm';
export declare class MatchService {
    private readonly matchRepo;
    private readonly eventRepo;
    constructor(matchRepo: Repository<Match>, eventRepo: Repository<Event>);
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
    getEvents(id: number): Promise<Event[]>;
}
