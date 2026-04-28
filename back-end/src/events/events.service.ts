import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event, EventType } from 'src/models/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
    
    private eventProbabilities: Record<EventType, number> = {
            [EventType.ACE]: 0.1,           // 10%
            [EventType.DOUBLE_ERROR]: 0.05, // 5%
            [EventType.POINT]: 0.5,         // 50%
            [EventType.ERROR]: 0.35         // 35%
    };
    
    constructor(
        @InjectRepository(Event) private readonly repository:Repository<Event>
    ){}


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
        let ev = this.repository.create({match,team,event});
        return await this.repository.save(ev);
    }
    
    async getEvents(id: number) {
        return await this.repository.find({ where: { match: id }, order: { id: 'ASC' } })
    }
}
