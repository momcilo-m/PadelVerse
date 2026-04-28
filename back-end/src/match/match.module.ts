import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { Match } from 'src/models/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from 'src/models/stats.entity';
import { Event } from 'src/models/event.entity';
import { EventsModule } from 'src/events/events.module';
@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchService],
  controllers: [MatchController],
  exports:[MatchService]
})
export class MatchModule { }
