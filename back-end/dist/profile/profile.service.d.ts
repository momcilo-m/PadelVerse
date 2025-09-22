import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
export declare class ProfileService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    saveFileInfo(file: Express.Multer.File, id: number): Promise<{
        message: string;
        filename: string;
        path: string;
    }>;
}
