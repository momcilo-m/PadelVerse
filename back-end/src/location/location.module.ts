import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { HttpModule } from '@nestjs/axios';
@Module({
    imports: [HttpModule],
    exports: [LocationService],
    providers: [LocationService],
})
export class LocationModule {}