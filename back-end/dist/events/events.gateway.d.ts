import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from "socket.io";
import { Match } from 'src/models/match.entity';
import { Repository } from 'typeorm';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly matchRepo;
    private users;
    constructor(matchRepo: Repository<Match>);
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
    handleEvent(match: number, event: string, team: number): Promise<void>;
    handleUserEvent(): Promise<void>;
}
