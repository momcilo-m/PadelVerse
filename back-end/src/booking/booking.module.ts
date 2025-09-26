import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthModule } from 'src/auth/auth.module';
import { ComplexModule } from 'src/complex/complex.module';
import { BookingController } from './booking.controller';
import { CourtsModule } from 'src/courts/courts.module';

@Module({
  imports:[AuthModule,CourtsModule],
  providers: [BookingService],
  exports:[BookingService],
  controllers:[BookingController]
})
export class BookingModule {}
