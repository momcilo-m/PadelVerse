import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/models/user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from "argon2";
import { randomBytes } from 'crypto';
import { plainToClass } from 'class-transformer';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>,
        private readonly mail:MailerService
    ){}

    async create(userDTO:UserDTO)
    {
        //Hash password
        const hash = await argon2.hash(userDTO.password);

        //Kreiranje tokena za registraciju i hash
        const token = randomBytes(32).toString('hex');
        const hashedToken = await argon2.hash(token);

        const user = plainToClass(User, userDTO);
        user.token_registration = hashedToken;
        user.password = hash;

        //Upis u bazu
        this.userRepository.create()
        const res = await this.userRepository.save(user);

        //Slanje mejla
        this.mail.send(user.email,token,user.first_name);        

        return res;
    }

    async activateUser(token_registration: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ token_registration });

        if (!user) {
            throw new NotFoundException('Korisnik sa datim tokenom nije pronađen.');
        }

        const isMatch = await argon2.verify(user.token_registration, token_registration);

        if (!isMatch) {
            throw new UnauthorizedException('Neispravan token za aktivaciju.');
        }

        user.is_active = true;
        user.token_registration = "";

        return await this.userRepository.save(user);
    }


}
