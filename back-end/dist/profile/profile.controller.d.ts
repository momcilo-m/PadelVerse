import { ProfileService } from './profile.service';
import { UpdateUserDTO } from 'src/models/update.user.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    uploadProfile(req: any, file: Express.Multer.File): Promise<{
        message: string;
        filename: string;
        path: string;
    }>;
    editProfile(req: any, user: UpdateUserDTO): Promise<import("typeorm").UpdateResult>;
}
