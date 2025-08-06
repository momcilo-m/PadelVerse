import { UserDTO } from 'src/models/user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from 'src/mailer/mailer.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly mail;
    constructor(userRepository: Repository<User>, mail: MailerService);
    create(userDTO: UserDTO): Promise<User>;
    activateUser(token_registration: string): Promise<User>;
}
