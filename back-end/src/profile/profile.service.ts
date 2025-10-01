import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from 'src/models/update.user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async profilePhoto(file: Express.Multer.File, id: number) {

        const updateData: Partial<User> = {};
        updateData.photo = "profile/" + file.filename;

        const update = await this.userRepository.update({ id }, updateData);

        if (update.affected == 0)
            throw new NotFoundException("User photo doesn't changed");

        return {
            message: 'You are successfully uploaded profile photo',
            filename: file.filename,
            path: `profile/${file.filename}`,
        };
    }

    async editProfile(id: number, userData: UpdateUserDTO) {

        const existingUser = await this.userRepository.findOneBy({ id });

        if (!existingUser) {
            throw new NotFoundException("User not found");
        }

        const updatedUser = this.userRepository.merge(existingUser, userData);

        const savedUser = await this.userRepository.save(updatedUser);

        return savedUser;
    }


}
