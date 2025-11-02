import { UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { stat } from 'fs';
import { Server, Socket } from "socket.io";
import { WsJwtAuthGuard } from 'src/auth/ws-jwt-auth.guard';
import { Match } from 'src/models/match.entity';
import { Stats } from 'src/models/stats.entity';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@WebSocketGateway({
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
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private users = new Map<string, string>();

  constructor(
    @InjectRepository(Match) private readonly matchRepo: Repository<Match>
  ) { }

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(@ConnectedSocket() client: any, @MessageBody() data: { room: number }) {

    let match = await this.matchRepo.findOneBy({ id: data.room, live: true });

    if (!match)
      return { success: false, message: "Match is finished" };

    client.join(data.room.toString());
    console.log(`join ${data.room}`)
    return { success: true, room: data.room };
  }

  async handleEvent(match: number, event: string, team: number, id: number, stats: Stats) {
    this.server.to(`${match}`).emit('event', { data: { event, team, id, stats } });
  }

  async handleMessage(id: number, user: string, message: string, match: number, time: Date) {
    console.log("SALJE SE PORUKA U SOBI", match)
    this.server.to(`${match}`).emit('chat', { data: { user, message, id, time: time } });
  }
}