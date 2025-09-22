import { Body, Controller, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { SampleDto } from 'src/models/sample.dto';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

    constructor(private readonly uploadService: ProfileService) {}

    @Post("photo")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
        destination: './public/profile',
        filename: (req:any, file, cb) => {
            const uniqueName = req.user.first_name+ '-' +Date.now() + path.extname(file.originalname);
            cb(null, uniqueName);
        },
        }),
    }))
    uploadProfile(@Req() req:any,@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.saveFileInfo(file,req.user.id);
    }


    // @UseInterceptors(FileInterceptor('file'))
    // @Post('file/pass-validation')
    // uploadFileAndPassValidation(
    //     @UploadedFile(
    //     new ParseFilePipeBuilder()
    //         .addFileTypeValidator({
    //             fileType: 'jpeg',
    //         })
    //         .build({
    //             fileIsRequired: true,
    //         }),
    //     )
    //     file?: Express.Multer.File,
    // ) {
    //     return {
    //     file: file?.buffer.toString(),
    //     };
    // }



    // @UseInterceptors(FileInterceptor('file'))
    // @Post('file/fail-validation')
    // uploadFileAndFailValidation(
    //     @UploadedFile(
    //     new ParseFilePipeBuilder()
    //         .addFileTypeValidator({
    //         fileType: 'jpg',
    //         })
    //         .build(),
    //     )
    //     file: Express.Multer.File,
    // ) {
    //     return {
    //     file: file.buffer.toString(),
    //     };
    // }

}