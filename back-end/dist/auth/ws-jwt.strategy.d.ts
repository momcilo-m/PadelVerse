import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { User } from "src/models/user.entity";
import { Repository } from "typeorm";
declare const WsJwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class WsJwtStrategy extends WsJwtStrategy_base {
    private readonly userRepository;
    private configService;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    validate(payload: any): Promise<User>;
}
export {};
