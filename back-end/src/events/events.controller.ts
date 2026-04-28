import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event, EventType } from "src/models/event.entity";
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {

    constructor(
        private readonly service:EventsService
    ){ }

    
    @Get(":id/events")
    async getEvents(@Param('id', ParseIntPipe) id: number) {
        return this.service.getEvents(id);
    }
}