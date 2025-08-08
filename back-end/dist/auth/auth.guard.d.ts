import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/models/user.entity";
import { Repository } from "typeorm";
export declare class AuthGuard implements CanActivate {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
