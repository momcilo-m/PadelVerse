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
exports.Chat = void 0;
const typeorm_1 = require("typeorm");
const match_entity_1 = require("./match.entity");
const user_entity_1 = require("./user.entity");
let Chat = class Chat {
    id;
    match;
    user;
    message;
    time;
};
exports.Chat = Chat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.OneToOne)(() => match_entity_1.Match),
    (0, typeorm_1.JoinColumn)({ name: 'match' }),
    __metadata("design:type", Number)
], Chat.prototype, "match", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user' }),
    __metadata("design:type", Number)
], Chat.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Chat.prototype, "time", void 0);
exports.Chat = Chat = __decorate([
    (0, typeorm_1.Entity)("chats")
], Chat);
//# sourceMappingURL=chat.entity.js.map