import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthModule } from 'src/auth/auth.module';
import { ComplexModule } from 'src/complex/complex.module';
import { BookingController } from './booking.controller';

@Module({
  imports:[AuthModule,ComplexModule],
  providers: [BookingService],
  exports:[BookingService],
  controllers:[BookingController]
})
export class BookingModule {}
