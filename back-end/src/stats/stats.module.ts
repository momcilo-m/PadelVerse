import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TermsModule } from 'src/terms/terms.module';
import { UsersModule } from 'src/users/users.module';
import { ComplexService } from 'src/complex/complex.service';
import { ComplexModule } from 'src/complex/complex.module';
import { CourtsModule } from 'src/courts/courts.module';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [TermsModule, UsersModule, ComplexModule, CourtsModule]
})
export class StatsModule { }
