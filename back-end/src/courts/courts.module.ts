import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from 'src/models/court.entity';
import { CourtsService } from './courts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Court])],
    exports: [TypeOrmModule,CourtsService],
    providers: [CourtsService],
    controllers: [],
})
export class CourtsModule {}
