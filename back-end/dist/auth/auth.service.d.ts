import { BadRequestException } from '@nestjs/common';
import { UserDTO } from 'src/models/user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from 'src/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PasswordUserDTO } from 'src/models/password.user.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly mail;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, mail: MailerService, jwtService: JwtService);
    create(userDTO: UserDTO): Promise<User>;
    activateUser(token_registration: string): Promise<User>;
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
