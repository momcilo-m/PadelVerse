import { EventsGateway } from "src/events/events.gateway";
import { Event } from "src/models/event.entity";
import { Match } from "src/models/match.entity";
import { Stats } from "src/models/stats.entity";
import { Team } from "src/models/team.entity";
import { Repository } from "typeorm";
export declare class SimulatorService {
    private readonly matchRepo;
    private readonly eventRepo;
    private readonly teamRepo;
    private readonly statsRepo;
    private eventsGateway;
    private readonly logger;
    constructor(matchRepo: Repository<Match>, eventRepo: Repository<Event>, teamRepo: Repository<Team>, statsRepo: Repository<Stats>, eventsGateway: EventsGateway);
    private eventProbabilities;
    createMatch(): Promise<Match | undefined>;
    events(): Promise<void>;
    matchEvent(match: Match): Promise<void>;
    private randomIndex;
    private randomEvent;
    private randomTeam;
    private handlePoint;
}
