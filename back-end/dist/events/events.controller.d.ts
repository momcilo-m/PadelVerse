import { Event } from "src/models/event.entity";
import { EventsService } from './events.service';
export declare class EventsController {
    private readonly service;
    constructor(service: EventsService);
    getEvents(id: number): Promise<Event[]>;
}
