import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/models/review.entity';
import { ComplexModule } from 'src/complex/complex.module';
import { ComplexService } from 'src/complex/complex.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), ComplexModule],
  providers: [TypeOrmModule, ReviewService],
  controllers: [ReviewController],
  exports: [ReviewService]
})
export class ReviewModule { }
