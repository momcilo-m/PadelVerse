import { ChatService } from './chat.service';
import { ChatDTO } from 'src/models/chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getMessage(id: number): Promise<any[]>;
    sendMessage(req: any, chatDTO: ChatDTO, id: number): Promise<import("../models/chat.entity").Chat>;
}
