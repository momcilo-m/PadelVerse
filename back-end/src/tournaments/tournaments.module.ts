import { Module } from '@nestjs/common';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'src/models/tournament.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ComplexModule } from 'src/complex/complex.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament]),AuthModule,ComplexModule],
  exports:[TypeOrmModule],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
