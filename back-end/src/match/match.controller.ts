import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {

    constructor(private readonly matchService: MatchService) { }

    @Get("live")
    async liveMatch() {
        return this.matchService.getLiveMatch();
    }

    @Get(':id/stats')
    async statsForMatch(@Param('id', ParseIntPipe) id: number) {
        return this.matchService.getStats(id);
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.matchService.getMatchById(id);
    }
}
