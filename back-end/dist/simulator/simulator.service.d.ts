import { EventsGateway } from "src/events/events.gateway";
import { EventsService } from "src/events/events.service";
import { MatchService } from "src/match/match.service";
import { Match } from "src/models/match.entity";
import { StatsService } from "src/stats/stats.service";
import { TeamsService } from "src/teams/teams.service";
export declare class SimulatorService {
    private readonly teamService;
    private readonly matchService;
    private readonly eventService;
    private readonly statService;
    private eventsGateway;
    private readonly logger;
    constructor(teamService: TeamsService, matchService: MatchService, eventService: EventsService, statService: StatsService, eventsGateway: EventsGateway);
    createMatch(): Promise<Match | undefined>;
    events(): Promise<void>;
    matchEvent(match: Match): Promise<void>;
}
