import { UpdateUserDTO } from 'src/models/update.user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
export declare class ProfileService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    profilePhoto(file: Express.Multer.File, id: number): Promise<{
        message: string;
        filename: string;
        path: string;
    }>;
    editProfile(id: number, userData: UpdateUserDTO): Promise<User>;
}
