import { BadRequestException } from '@nestjs/common';
import { UserDTO } from 'src/models/user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from 'src/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PasswordUserDTO } from 'src/models/password.user.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userRepository;
    private readonly mail;
    private readonly jwtService;
    private configService;
    private readonly token_secret;
    constructor(userRepository: Repository<User>, mail: MailerService, jwtService: JwtService, configService: ConfigService);
    create(userDTO: UserDTO): Promise<{
        message: string;
    }>;
    activateUser(token_registration: string): Promise<{
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        status: string;
        token: string;
        user: User;
    }>;
    isLogin(req: Request): Promise<{
        status: string;
        user: Express.User;
    }>;
    changePassword(data: PasswordUserDTO): Promise<User | BadRequestException>;
    forgotPassword(): Promise<void>;
    resetPassword(): Promise<void>;
}
