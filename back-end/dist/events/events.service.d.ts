import { Event, EventType } from 'src/models/event.entity';
import { Repository } from 'typeorm';
export declare class EventsService {
    private readonly repository;
    private eventProbabilities;
    constructor(repository: Repository<Event>);
    generateRandomEvent(): string;
    createEvent(match: number, team: number, event: EventType): Promise<Event>;
    getEvents(id: number): Promise<Event[]>;
}
