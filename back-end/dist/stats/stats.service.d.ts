import { Term } from 'src/models/term.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
export declare class StatsService {
    private readonly termsRepository;
    private readonly userService;
    constructor(termsRepository: Repository<Term>, userService: UsersService);
    private getTermsByDateRange;
    private thisMonth;
    private thisWeek;
    monthStats(complex: number): Promise<{
        status: string;
        data: {
            totalCount: number;
            courtsCount: Record<string, number>;
            totalAmount: number;
            amountPerWeek: number[];
            user: {
                topUser: import("../models/user.entity").User | null;
                count: number;
            };
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
