import { BadRequestException, Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/models/event.entity';
import { Match } from 'src/models/match.entity';
import { Stats } from 'src/models/stats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {

    constructor(
        @InjectRepository(Match) private readonly matchRepo: Repository<Match>,
        @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    ) { }

    async getLiveMatch() {
        return await this.matchRepo.find({ where: { live: true }, relations: ['team1', 'team2'] })
    }

    async getMatchById(id: number) {
        const res = await this.matchRepo.findOne({ where: { id }, relations: ['match_stats', 'team1', 'team2'] })

        if (!res)
            return new BadRequestException("Not found");

        const { match_stats, ...cleanRes } = res;

        return {
            match: cleanRes,
            stats: match_stats
        }
    }

    async getStats(id: number) {
        let res = await this.matchRepo.findOne({ where: { id }, relations: ['match_stats']})
        return res?.match_stats;
    }

    async getEvents(id: number) {
        return await this.eventRepo.find({ where: { match: id }, order: { id: 'ASC' } })
    }

    async createMatch(match_stats:number, team1:number, team2:number)
    {
        let match = this.matchRepo.create({ match_stats, team1, team2});
        return await this.matchRepo.save(match);
    }

    async finishMatch(match:Match)
    {
        match.live = false;
        await this.matchRepo.save(match);
    }
}
