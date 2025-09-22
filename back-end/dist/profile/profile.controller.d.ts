import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly uploadService;
    constructor(uploadService: ProfileService);
    uploadProfile(req: any, file: Express.Multer.File): Promise<{
        message: string;
        filename: string;
        path: string;
    }>;
}
