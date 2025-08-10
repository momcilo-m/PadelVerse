import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from 'src/models/court.entity';
import { CourtsService } from './courts.service';
import { CourtsController } from './courts.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Court]),UsersModule,AuthModule],
  exports: [TypeOrmModule,CourtsService],
  providers: [CourtsService],
  controllers: [CourtsController],
})
export class CourtsModule {}
