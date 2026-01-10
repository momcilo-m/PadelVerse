import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamsModule } from './teams.module';
import { Team } from 'src/models/team.entity';
import { Repository } from 'typeorm';
import { Match } from 'src/models/match.entity';
import { EventType } from 'src/models/event.entity';

@Injectable()
export class TeamsService {

    constructor(
        @InjectRepository(Team) private readonly teamRepo:Repository<Team>
    )
    {}

    async findNotPlayingTeams()
    {
        const availableTeams = await this.teamRepo
                    .createQueryBuilder('team')
                    .where(qb => {
                        const subQuery1 = qb.subQuery()
                            .select('m.team1')
                            .from(Match, 'm')
                            .where('m.live = true')
                            .getQuery();
        
                        const subQuery2 = qb.subQuery()
                            .select('m.team2')
                            .from(Match, 'm')
                            .where('m.live = true')
                            .getQuery();
        
                        return `team.id NOT IN ${subQuery1} AND team.id NOT IN ${subQuery2}`;
                    })
                    .getMany();
        
                if (availableTeams.length < 2)
                    return [null,null];
        

        const [i1,i2] = this.randomIndex(availableTeams);

        return [availableTeams[i1],availableTeams[i2]]

    }

    private randomIndex(array: Team[]):number[]{
        const i1 = Math.floor(Math.random() * array.length);
        let i2: number;
        do {
            i2 = Math.floor(Math.random() * array.length);
        } while (i2 === i1);

        return [i1, i2];
    }

    randomTeam(match: Match, event: string, serve: number): number[] {

        let id: number = 0;
        let index: number = 0;
        let idInit: number = 0;

        switch (event) {
            case EventType.DOUBLE_ERROR:
                index = serve === match.team1 ? 1 : 0;
                id = serve === match.team1 ? match.team2 : match.team1;
                idInit = serve;// === match.team1 ? match.team1 : match.team2;
                break;

            case EventType.ERROR:

                if (Math.random() < 0.5) {
                    idInit = match.team1;
                    id = match.team2;
                    index = 1;
                } else {
                    idInit = match.team2;
                    id = match.team1;
                    index = 0;
                }

                break;

            case EventType.POINT:
                if (Math.random() < 0.5) {
                    id = match.team1;
                    idInit = match.team1;
                    index = 0;
                } else {
                    id = match.team2;
                    idInit = match.team2;
                    index = 1;
                }

                break;

            case EventType.ACE:

                id = serve;
                idInit = serve;
                index = serve === match.team1 ? 0 : 1;

                break;
        }

        return [index, id, idInit];
    }
}
