import { Team } from 'src/models/team.entity';
import { Repository } from 'typeorm';
import { Match } from 'src/models/match.entity';
export declare class TeamsService {
    private readonly teamRepo;
    constructor(teamRepo: Repository<Team>);
    findNotPlayingTeams(): Promise<Team[] | null[]>;
    private randomIndex;
    randomTeam(match: Match, event: string, serve: number): number[];
}
