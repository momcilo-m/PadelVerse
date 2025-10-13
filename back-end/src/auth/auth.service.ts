import { BadRequestException, Injectable, Next, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/models/user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from "argon2";
import { randomBytes, createHmac } from 'crypto';
import { plainToClass } from 'class-transformer';
import { MailerService } from 'src/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PasswordUserDTO } from 'src/models/password.user.dto';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly mail: MailerService,
        private readonly jwtService: JwtService
    ) { }

    async create(userDTO: UserDTO) {
        //Hash password
        const hash = await argon2.hash(userDTO.password);

        //Kreiranje tokena za registraciju i hash
        const token = randomBytes(32).toString('hex');
        const hashedToken = createHmac('sha256', "0v0 j3 v30m4 t3z4k fl4gg").update(token).digest('hex');

        const user = plainToClass(User, userDTO);
        user.token_registration = hashedToken;
        user.password = hash;

        //Upis u bazu
        const res = await this.userRepository.save(user);

        //Slanje mejla
        this.mail.send(user.email, token, user.first_name);

        return { message: "User created. Please visit your email to confirm registration" }
    }

    async activateUser(token_registration: string) {

        const hashedToken = createHmac('sha256', "0v0 j3 v30m4 t3z4k fl4gg").update(token_registration).digest('hex');
        const user = await this.userRepository.findOneBy({ token_registration: hashedToken });

        if (!user) {
            throw new UnauthorizedException('Invalid registration token');
        }

        user.is_active = true;
        user.token_registration = "";

        await this.userRepository.save(user);
        return { message: "You are successfully activated user" }
    }

    async login(email: string, password: string) {
        if (!email || !password)
            throw new UnauthorizedException('Please insert your email and password');

        const user = await this.userRepository.findOneBy({ email });

        if (!user || !user.is_active)
            throw new UnauthorizedException('User not found');

        const verify = await argon2.verify(user.password, password);

        if (!verify)
            throw new UnauthorizedException('Incorrect email or password');

        const token = this.jwtService.sign({ id: user.id }, { expiresIn: 30 * 24 * 60 * 60 });

        const cookieOptions = {
            expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "lax",
            secure: false
        }

        user.password = "";

        return {
            'status': 'success',
            'token': token,
            user
        };

    }

    async isLogin(req: Request) {

        return {
            'status': 'success',
            'user': req.user
        }
    }

    async changePassword(data: PasswordUserDTO) {
        const { email, password, newPassword, confirmPassword } = data;

        if (newPassword != confirmPassword)
            return new BadRequestException("Password don't same")

        const user = await this.userRepository.findOneBy({ email });

        if (!user)
            return new BadRequestException("Incorrect email or password");

        const verify = await argon2.verify(user.password, password);
        console.log(password, verify, user.password);

        if (!verify)
            return new BadRequestException("Incorrect email or password");

        let pass = await argon2.hash(newPassword);

        user.password = pass;

        return await this.userRepository.save(user);
    }

    async forgotPassword() {

    }

    async resetPassword() {

    }
}
