import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
declare const WsJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class WsJwtAuthGuard extends WsJwtAuthGuard_base implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    getRequest(context: ExecutionContext): any;
    private extractTokenFromQuery;
}
export {};
