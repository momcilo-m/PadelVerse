import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor() {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const client = context.switchToWs().getClient();

        // Ekstrakt JWT token iz WebSocket handshake query parametara
        const token = this.extractTokenFromQuery(client.handshake.query);

        console.log(token);

        if (!token) {
            return false;
        }

        // Postavi token u handshake headers kako bi JWT strategija mogla da ga pronađe
        client.handshake.headers.authorization = `Bearer ${token}`;

        return super.canActivate(context);
    }

    getRequest(context: ExecutionContext) {
        return context.switchToWs().getClient().handshake;
    }

    private extractTokenFromQuery(query: any): string | null {
        if (query && query.token) {
            return Array.isArray(query.token) ? query.token[0] : query.token;
        }
        return null;
    }
}