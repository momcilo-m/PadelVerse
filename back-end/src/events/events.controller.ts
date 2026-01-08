import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event, EventType } from "src/models/event.entity";

@Controller('events')
export class EventsController {

    constructor(
            @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    ){ }
 
    private eventProbabilities: Record<EventType, number> = {
            [EventType.ACE]: 0.1,           // 10%
            [EventType.DOUBLE_ERROR]: 0.05, // 5%
            [EventType.POINT]: 0.5,         // 50%
            [EventType.ERROR]: 0.35         // 35%
        };
    


    generateRandomEvent()
    {
        const events = Object.keys(this.eventProbabilities) as unknown as EventType[];
        const rand = Math.random();
        let cumulative = 0;

        for (const event of events) {
            const prob = this.eventProbabilities[event];
            cumulative += prob;
            if (rand < cumulative) {
                return event.toString();
            }
        }

        return EventType.ERROR;
    }

    async createEvent(match:number, team:number, event:EventType)
    {
        let ev = this.eventRepo.create({match,team,event});
        // ev.match = match;
        // ev.team = team;
        // ev.event = event as EventType

        return await this.eventRepo.save(ev);

    }
}