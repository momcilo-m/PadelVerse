"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const events_gateway_1 = require("../events/events.gateway");
const chat_entity_1 = require("../models/chat.entity");
const typeorm_2 = require("typeorm");
let ChatService = class ChatService {
    chatRepo;
    eventsGateway;
    constructor(chatRepo, eventsGateway) {
        this.chatRepo = chatRepo;
        this.eventsGateway = eventsGateway;
    }
    async sendMessage(chatDTO, username) {
        const chat = (0, class_transformer_1.plainToClass)(chat_entity_1.Chat, chatDTO);
        let ch = await this.chatRepo.save(chat);
        this.eventsGateway.handleMessage(ch.id, username, ch.message, ch.match, ch.time);
        console.log(ch);
        return ch;
    }
    async getMessageForMatch(id) {
        return this.chatRepo
            .createQueryBuilder('chat')
            .leftJoin('chat.user', 'user')
            .select([
            '"chat"."id" AS id',
            '"chat"."message" as message',
            '"chat"."time" as time',
            '"chat"."match" AS match',
            '"user"."first_name" AS user',
        ])
            .getRawMany();
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        events_gateway_1.EventsGateway])
], ChatService);
//# sourceMappingURL=chat.service.js.map