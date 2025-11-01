import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/models/event.entity';
import { Match } from 'src/models/match.entity';
import { Player } from 'src/models/player.entity';
import { Stats } from 'src/models/stats.entity';
import { Team } from 'src/models/team.entity';
import { SimulatorService } from './simulator.service';
import { EventsModule } from 'src/events/events.module';

@Module({

    imports: [TypeOrmModule.forFeature([Player, Team, Match, Stats, Event]), EventsModule],
    providers: [TypeOrmModule, SimulatorService],
    controllers: [],
    exports: [SimulatorService]
})
export class SimulatorModule {

}