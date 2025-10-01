import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TermsModule } from 'src/terms/terms.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports:[TermsModule,UsersModule]
})
export class StatsModule {}
