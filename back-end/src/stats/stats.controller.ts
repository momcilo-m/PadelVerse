import { Controller, Get, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {


    constructor(
        private readonly service: StatsService
    ) { }

    @Get("month/:id")
    getMonthStats(@Param('id', ParseIntPipe) id: number) {
        return this.service.monthStats(id);
    }

    @Get("week/:id")
    getWeekStats(@Param('id', ParseIntPipe) id: number) {
        return this.service.weekStats(id);
    }

    @Get("/:id")
    getGlobalStats(@Param('id', ParseIntPipe) id: number) {
        return this.service.globalStats(id);
    }
}
