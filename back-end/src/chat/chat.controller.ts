import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDTO } from 'src/models/chat.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {


    constructor(private readonly chatService: ChatService) { }

    @Get(":id")
    async getMessage(@Param("id", ParseIntPipe) id: number) {
        return this.chatService.getMessageForMatch(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async sendMessage(@Req() req, @Body(new ValidationPipe({ transform: true })) chatDTO: ChatDTO) {
        chatDTO.user = req.user.id;
        return this.chatService.sendMessage(chatDTO, req.user.first_name)
    }

}
