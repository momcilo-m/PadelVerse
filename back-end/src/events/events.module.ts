import { forwardRef, Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/models/player.entity';
import { Team } from 'src/models/team.entity';
import { Match } from 'src/models/match.entity';
import { Stats } from 'fs';
import { EventsController } from './events.controller';
import { TeamsModule } from 'src/teams/teams.module';
import { MatchModule } from 'src/match/match.module';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]),TeamsModule,MatchModule],
  providers: [EventsGateway, EventsService],
  exports: [EventsGateway,EventsService],
  controllers: [EventsController]
})
export class EventsModule { }
