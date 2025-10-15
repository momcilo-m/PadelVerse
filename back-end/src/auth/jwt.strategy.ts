import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/models/user.entity";
import { Repository } from "typeorm";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')
{

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private configService: ConfigService

    ) {
        const secret = configService.get("JWT_SECRET")
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                (req) => req.cookies.jwt

            ]),
            //secretOrKey: "hard!to-guess_secret"
            secretOrKey: secret
        });
    }

    async validate(payload: any) {
        const user = await this.userRepository.findOne({ where: { id: payload.id } })

        if (!user || !user.is_active) {
            throw new UnauthorizedException('User not found or inactive');
        }

        return user;
    }

}