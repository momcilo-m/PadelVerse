import { Controller, Get, Param, ParseIntPipe, UseGuards, ValidationPipe } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('stats')
export class StatsController {


    constructor(
        private readonly service: StatsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("month/:id")
    getMonthStats(@Param('id', ParseIntPipe) id: number) {
        return this.service.monthStats(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("week/:id")
    getWeekStats(@Param('id', ParseIntPipe) id: number) {
        return this.service.weekStats(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    getGlobalStats(@Param('id', ParseIntPipe) id: number) {
        return this.service.globalStats(id);
    }
}
