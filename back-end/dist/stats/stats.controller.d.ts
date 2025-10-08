import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly service;
    constructor(service: StatsService);
    getMonthStats(id: number): Promise<{
        totalCount: number;
        courtsCount: {
            name: string;
            value: number;
        }[];
        totalAmount: number;
        amountPerWeek: {
            name: string;
            value: number;
        }[];
        user: {
            topUser: import("../models/user.entity").User | null;
            count: number;
        };
    }>;
    getWeekStats(id: number): Promise<{
        totalCount: number;
        courtsCount: {
            name: string;
            value: number;
        }[];
        totalAmount: number;
        todayCount: number;
        todayAmount: number;
    }>;
    getGlobalStats(id: number): Promise<{
        noOfComplex: number;
        noOfCourts: number;
        noOfTerms: number;
        totalAmount: number;
    }>;
}
