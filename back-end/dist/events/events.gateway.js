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
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const match_service_1 = require("../match/match.service");
let EventsGateway = class EventsGateway {
    matchService;
    users = new Map();
    constructor(matchService) {
        this.matchService = matchService;
    }
    server;
    handleConnection(client, ...args) {
        console.log('Client connected:', client.id);
    }
    handleDisconnect(client) {
        console.log('Client disconnected:', client.id);
    }
    async handleJoinRoom(client, data) {
        let match = await this.matchService.getLiveMatchById(data.room);
        if (!match)
            return { success: false, message: "Match is finished" };
        client.join(data.room.toString());
        console.log(`join ${data.room}`);
        return { success: true, room: data.room };
    }
    async handleEvent(match, event, team, id, stats) {
        this.server.to(`${match}`).emit('event', { data: { event, team, id, stats } });
    }
    async handleMessage(id, user, message, match, time) {
        console.log("SALJE SE PORUKA U SOBI", match);
        this.server.to(`${match}`).emit('chat', { data: { user, message, id, time: time } });
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-room'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleJoinRoom", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: [
                "http://127.0.0.1:5500",
                "http://localhost:3000",
                "http://localhost:4200",
                "http://127.0.0.1:3000"
            ],
            methods: ["GET", "POST"],
            credentials: true
        }
    }),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map