import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    
    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>
    ){}
    
    async saveFileInfo(file: Express.Multer.File, id:number) {
        
        const updateData: Partial<User> = {};
        updateData.photo = "public/"+file.filename;

        const update = await this.userRepository.update({id}, updateData);

        if(update.affected == 0)
            throw new NotFoundException("User photo doesn't changed");
        
        return {
            message: 'Upload uspešan!',
            filename: file.filename,
            path: file.path,
        };
  }

}
