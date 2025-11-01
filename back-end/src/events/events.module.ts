import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/models/player.entity';
import { Team } from 'src/models/team.entity';
import { Match } from 'src/models/match.entity';
import { Stats } from 'fs';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Team, Match, Stats, Event])],
  providers: [EventsGateway],
  exports: [EventsGateway]
})
export class EventsModule { }
