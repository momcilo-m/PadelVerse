import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TermsModule } from 'src/terms/terms.module';
import { UsersModule } from 'src/users/users.module';
import { ComplexService } from 'src/complex/complex.service';
import { ComplexModule } from 'src/complex/complex.module';
import { CourtsModule } from 'src/courts/courts.module';
import { TeamsModule } from 'src/teams/teams.module';
import { MatchModule } from 'src/match/match.module';
import { Stats } from 'src/models/stats.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [TypeOrmModule.forFeature([Stats]), TermsModule, UsersModule, ComplexModule, CourtsModule,MatchModule],
  exports: [StatsService]
})
export class StatsModule { }
