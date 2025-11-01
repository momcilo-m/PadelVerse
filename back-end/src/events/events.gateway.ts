import { UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { WsJwtAuthGuard } from 'src/auth/ws-jwt-auth.guard';
import { Match } from 'src/models/match.entity';
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
    // Prihvati sve konekcije
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
    console.log("JOIN JE")
    return { success: true, room: data.room };
  }

  async handleEvent(match: number, event: string, team: number) {
    console.log("SALJE")
    this.server.to(`${match}`).emit('event', { data: { match, event, team } });
  }

  @SubscribeMessage('event')
  async handleUserEvent() {
    await this.handleEvent(1, "POINT", 4);
  }
}
// private async tryAuthenticateClient(client: any) {
//   try {
//     const guard = new WsJwtAuthGuard();
//     const context = {
//       switchToWs: () => ({
//         getClient: () => client,
//         getData: () => ({}),
//       }),
//       getHandler: () => ({} as any),
//       getClass: () => EventsGateway,
//     };

//     if (await guard.canActivate(context as any)) {
//       client.user = client.handshake.user;
//       console.log('User authenticated:', client.user.id);
//     }
//   } catch (err) {
//     // Ostavi client.user undefined - public konekcija
//   }
// }
