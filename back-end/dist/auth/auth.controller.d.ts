import type { Response } from 'express';
import { UserDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';
import { PasswordUserDTO } from 'src/models/password.user.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly service;
    private configService;
    private readonly cookieExpireDays;
    constructor(service: AuthService, configService: ConfigService);
    register(userDTO: UserDTO): Promise<{
        message: string;
    }>;
    confirmRegister(token: string): Promise<{
        message: string;
    }>;
    login(email: string, password: string, response: Response): Promise<{
        status: string;
        token: string;
        user: import("../models/user.entity").User;
    }>;
    me(req: any): Promise<{
        status: string;
        user: Express.User;
    }>;
    changePassword(req: any, user: PasswordUserDTO): Promise<import("../models/user.entity").User | import("@nestjs/common").BadRequestException>;
    logout(response: Response): {
        message: string;
    };
}
