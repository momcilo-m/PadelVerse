"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../models/user.entity");
const typeorm_2 = require("typeorm");
const argon2 = __importStar(require("argon2"));
const crypto_1 = require("crypto");
const class_transformer_1 = require("class-transformer");
const mailer_service_1 = require("../mailer/mailer.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userRepository;
    mail;
    jwtService;
    constructor(userRepository, mail, jwtService) {
        this.userRepository = userRepository;
        this.mail = mail;
        this.jwtService = jwtService;
    }
    async create(userDTO) {
        const hash = await argon2.hash(userDTO.password);
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const hashedToken = (0, crypto_1.createHmac)('sha256', "0v0 j3 v30m4 t3z4k fl4gg").update(token).digest('hex');
        const user = (0, class_transformer_1.plainToClass)(user_entity_1.User, userDTO);
        user.token_registration = hashedToken;
        user.password = hash;
        this.userRepository.create();
        const res = await this.userRepository.save(user);
        this.mail.send(user.email, token, user.first_name);
        return res;
    }
    async activateUser(token_registration) {
        const hashedToken = (0, crypto_1.createHmac)('sha256', "0v0 j3 v30m4 t3z4k fl4gg").update(token_registration).digest('hex');
        const user = await this.userRepository.findOneBy({ token_registration: hashedToken });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid registration token');
        }
        user.is_active = true;
        user.token_registration = "";
        return await this.userRepository.save(user);
    }
    async login(email, password) {
        if (!email || !password)
            throw new common_1.UnauthorizedException('Please insert your email and password');
        const user = await this.userRepository.findOneBy({ email });
        if (!user)
            throw new common_1.UnauthorizedException('user not found');
        const verify = await argon2.verify(user.password, password);
        if (!verify)
            throw new common_1.UnauthorizedException('Incorrect email or password');
        const token = this.jwtService.sign({ id: user.id }, { expiresIn: 30 * 24 * 60 * 60 });
        user.password = "";
        return {
            'status': 'success',
            'token': token
        };
    }
    async isLogin(req) {
        return {
            'status': 'success',
            'user': req.user
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_service_1.MailerService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map