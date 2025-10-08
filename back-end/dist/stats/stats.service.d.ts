import { ComplexService } from 'src/complex/complex.service';
import { CourtsService } from 'src/courts/courts.service';
import { Term } from 'src/models/term.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
export declare class StatsService {
    private readonly termsRepository;
    private readonly userService;
    private readonly complexService;
    private readonly courtsService;
    constructor(termsRepository: Repository<Term>, userService: UsersService, complexService: ComplexService, courtsService: CourtsService);
    private getTermsByDateRange;
    private thisMonth;
    private thisWeek;
    monthStats(complex: number): Promise<{
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
    weekStats(complex: number): Promise<{
        totalCount: number;
        courtsCount: {
            name: string;
            value: number;
        }[];
        totalAmount: number;
        todayCount: number;
        todayAmount: number;
    }>;
    private getWeekInMonth;
    globalStats(id: number): Promise<{
        noOfComplex: number;
        noOfCourts: number;
        noOfTerms: number;
        totalAmount: number;
    }>;
}
