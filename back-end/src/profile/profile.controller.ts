import { Body, Controller, ParseFilePipeBuilder, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { SampleDto } from 'src/models/sample.dto';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDTO } from 'src/models/update.user.dto';

@Controller('profile')
export class ProfileController {


    // @UseInterceptors(FileInterceptor('file'))
    // @Post('file')
    // uploadFile(
    //     @UploadedFile() file: Express.Multer.File,
    // ) {
    //     return {
    //         file: file.buffer.toString(),
    //     };
    // }

    constructor(private readonly profileService: ProfileService) { }

    @Post("photo")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/photo/profile',
            filename: (req: any, file, cb) => {
                const uniqueName = req.user.first_name + '-' + Date.now() + path.extname(file.originalname);
                cb(null, uniqueName);
            },
        }),
    }))
    uploadProfile(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        return this.profileService.profilePhoto(file, req.user.id);
    }

    @Patch("")
    @UseGuards(JwtAuthGuard)
    editProfile(@Req() req: any, @Body(new ValidationPipe({ whitelist: true })) user: UpdateUserDTO) {
        return this.profileService.editProfile(req.user.id, user);
    }

}