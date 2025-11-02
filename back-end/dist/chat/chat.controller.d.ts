import { ChatService } from './chat.service';
import { ChatDTO } from 'src/models/chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getMessage(id: number): Promise<import("../models/chat.entity").Chat[]>;
    sendMessage(req: any, chatDTO: ChatDTO): Promise<import("../models/chat.entity").Chat>;
}
