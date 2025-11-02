import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { EventsGateway } from 'src/events/events.gateway';
import { ChatDTO } from 'src/models/chat.dto';
import { Chat } from 'src/models/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
        private eventsGateway: EventsGateway
    ) { }

    async sendMessage(chatDTO: ChatDTO, username: string) {
        const chat = plainToClass(Chat, chatDTO);
        let ch = await this.chatRepo.save(chat);

        this.eventsGateway.handleMessage(ch.id, username, ch.message, ch.match, ch.time);
        console.log(ch)

        return ch;
    }

    async getMessageForMatch(id: number) {
        return await this.chatRepo.findBy({ match: id });
    }
}
