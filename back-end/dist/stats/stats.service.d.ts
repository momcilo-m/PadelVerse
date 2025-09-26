import { Term } from 'src/models/term.entity';
import { Repository } from 'typeorm';
export declare class StatsService {
    private readonly termsRepository;
    constructor(termsRepository: Repository<Term>);
    private getTermsByMonth;
    monthStats(complex: number): Promise<{
        status: string;
        data: {
            totalCount: number;
            courtsCount: Record<string, number>;
            totalAmount: number;
            amountPerWeek: number[];
        };
    }>;
    weekStats(complex: number): Promise<{
        status: string;
        data: {
            totalCount: number;
            courtsCount: Record<string, number>;
            totalAmount: number;
            todayCount: number;
            todayAmount: number;
        };
    }>;
    private getWeekInMonth;
}
