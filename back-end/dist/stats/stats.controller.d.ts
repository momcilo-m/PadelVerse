import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly service;
    constructor(service: StatsService);
    getMonthStats(id: number): Promise<{
        status: string;
        data: {
            totalCount: number;
            courtsCount: Record<string, number>;
            totalAmount: number;
            amountPerWeek: number[];
        };
    }>;
    getWeekStats(id: number): Promise<{
        status: string;
        data: {
            totalCount: number;
            courtsCount: Record<string, number>;
            totalAmount: number;
            todayCount: number;
            todayAmount: number;
        };
    }>;
}
