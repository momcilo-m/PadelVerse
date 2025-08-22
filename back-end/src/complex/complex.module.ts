import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complex } from 'src/models/complex.entity';
import { ComplexService } from './complex.service';
import { ComplexController } from './complex.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Complex]),UsersModule,AuthModule],
  exports: [TypeOrmModule,ComplexService],
  providers: [ComplexService],
  controllers: [ComplexController],
})
export class ComplexModule {}
