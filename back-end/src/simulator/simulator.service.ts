import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { EventsGateway } from "src/events/events.gateway";
import { EventsService } from "src/events/events.service";
import { MatchService } from "src/match/match.service";
import { Event, EventType } from "src/models/event.entity";
import { Match } from "src/models/match.entity";
import { PointType, Stats } from "src/models/stats.entity";
import { Team } from "src/models/team.entity";
import { StatsService } from "src/stats/stats.service";
import { TeamsService } from "src/teams/teams.service";
import { Repository } from "typeorm";

@Injectable()
export class SimulatorService {
    private readonly logger = new Logger(SimulatorService.name);

    constructor(
        private readonly teamService: TeamsService,
        private readonly matchService: MatchService,
        private readonly eventService: EventsService,
        private readonly statService: StatsService,
        private eventsGateway: EventsGateway
    ) { }

    //@Cron('*/1 * * * *')
    async createMatch() {
        //1. Izaberi dva razlicita tima koji trenutno ne igraju
        const [team1,team2] = await this.teamService.findNotPlayingTeams()
        if(!team1 || !team2)
            return;

        //2. Izracunaj verovatnocu za pobedu tima
        
        
        //3. Kreiraj match stats
        const stats = await this.statService.createStats(team1.id)
        
        //4. Kreiraj match
        return await this.matchService.createMatch(stats.id,team1.id,team2.id);
    }

    //@Cron('*/10  * * * * *')
    async events() {
        const matches = await this.matchService.getLiveMatch();
        await Promise.all(matches.map((match) => this.matchEvent(match)));
    }

    async matchEvent(match: Match) {

        //1. nasumicno generisi events
        const event = this.eventService.generateRandomEvent();
        //console.log(event, typeof event)

        //2. izaberi koji tim je generisao event
        const stats = await this.statService.findById(match.match_stats)
        if (!stats) return;

        const [teamIndex, teamID, initId] = this.teamService.randomTeam(match, event, stats!.currentServe);
        //console.log("TIM", teamID, " je osvojio poen ", initId, " je generisao event ", event)
        
        //3. azuriraj statistiku
        await this.statService.handleEvent(match.id,stats, teamIndex,match.team1, match.team2);

        let created_event = await this.eventService.createEvent(match.id,initId,event as EventType);

        //Slanje poruke
        this.eventsGateway.handleEvent(match.id, event, initId, created_event.id, stats);
    }
}