import { ComplexService } from 'src/complex/complex.service';
import { CourtsService } from 'src/courts/courts.service';
import { MatchService } from 'src/match/match.service';
import { Stats } from 'src/models/stats.entity';
import { TermsService } from 'src/terms/terms.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
export declare class StatsService {
    private readonly statsRepo;
    private readonly userService;
    private readonly complexService;
    private readonly courtsService;
    private readonly termSrevice;
    private readonly matchSrevice;
    constructor(statsRepo: Repository<Stats>, userService: UsersService, complexService: ComplexService, courtsService: CourtsService, termSrevice: TermsService, matchSrevice: MatchService);
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
    createStats(currentServe: number): Promise<Stats>;
    private handlePoint;
    handleEvent(match_id: number, stats: Stats, index: number, team1: number, team2: number): Promise<void>;
    findById(id: number): Promise<Stats | null>;
}
