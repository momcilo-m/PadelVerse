import { BadRequestException, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from 'src/models/update.user.dto';
import { UserDTO } from 'src/models/user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    
    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User>
    ){}
    
    async profilePhoto(file: Express.Multer.File, id:number) {
        
        const updateData: Partial<User> = {};
        updateData.photo = "profile/"+file.filename;

        const update = await this.userRepository.update({id}, updateData);

        if(update.affected == 0)
            throw new NotFoundException("User photo doesn't changed");
        
        return {
            message: 'You are successfully uploaded profile photo',
            filename: file.filename,
            path: file.path,
        };
    }

    async editProfile(id:number,user:UpdateUserDTO)
    {    
        console.log(user);

        const update = await this.userRepository.update({id},user);

        if(update.affected == 0)
        {
            throw new BadRequestException("Nothing has been changed!");
        }

        return update;
    }

}
