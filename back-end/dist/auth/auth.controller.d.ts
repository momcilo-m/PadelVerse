import { UserDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    register(userDTO: UserDTO): Promise<import("../models/user.entity").User>;
    confirmRegister(token: string): Promise<import("../models/user.entity").User>;
}
