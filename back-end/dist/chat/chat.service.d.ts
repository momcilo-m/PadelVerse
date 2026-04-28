import { EventsGateway } from 'src/events/events.gateway';
import { ChatDTO } from 'src/models/chat.dto';
import { Chat } from 'src/models/chat.entity';
import { Repository } from 'typeorm';
export declare class ChatService {
    private readonly chatRepo;
    private eventsGateway;
    constructor(chatRepo: Repository<Chat>, eventsGateway: EventsGateway);
    sendMessage(chatDTO: ChatDTO, username: string): Promise<Chat>;
    getMessageForMatch(id: number): Promise<any[]>;
}
