import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from "socket.io";
import { MatchService } from 'src/match/match.service';
import { Stats } from 'src/models/stats.entity';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly matchService;
    private users;
    constructor(matchService: MatchService);
    server: Server;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    handleJoinRoom(client: any, data: {
        room: number;
    }): Promise<{
        success: boolean;
        message: string;
        room?: undefined;
    } | {
        success: boolean;
        room: number;
        message?: undefined;
    }>;
    handleEvent(match: number, event: string, team: number, id: number, stats: Stats): Promise<void>;
    handleMessage(id: number, user: string, message: string, match: number, time: Date): Promise<void>;
}
