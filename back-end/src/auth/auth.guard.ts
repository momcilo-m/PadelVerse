import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/user.entity";
import { Repository } from "typeorm";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const req = context.switchToHttp().getRequest<Request>();
    
        let token = '';
        if(req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer'))
        {
            token = req.headers['authorization']?.split('Bearer ')[1];
        }
        else
        {
            token = (req as any)?.cookies?.jwt;
        }
       
        if(!token)
        {
            throw new NotFoundException('Please Login');
        }

        const verify = this.jwtService.verify(token);

        const user = await this.userRepository.findOneBy({id:verify.id});

        if(!user || !user.is_active)
            throw new NotFoundException('User not found');

        req.user = user;
        return true;
    }
}