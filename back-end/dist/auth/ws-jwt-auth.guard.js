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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsJwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let WsJwtAuthGuard = class WsJwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
    }
    canActivate(context) {
        const client = context.switchToWs().getClient();
        const token = this.extractTokenFromQuery(client.handshake.query);
        console.log(token);
        if (!token) {
            return false;
        }
        client.handshake.headers.authorization = `Bearer ${token}`;
        return super.canActivate(context);
    }
    getRequest(context) {
        return context.switchToWs().getClient().handshake;
    }
    extractTokenFromQuery(query) {
        if (query && query.token) {
            return Array.isArray(query.token) ? query.token[0] : query.token;
        }
        return null;
    }
};
exports.WsJwtAuthGuard = WsJwtAuthGuard;
exports.WsJwtAuthGuard = WsJwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WsJwtAuthGuard);
//# sourceMappingURL=ws-jwt-auth.guard.js.map