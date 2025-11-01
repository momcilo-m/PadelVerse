import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/models/user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    getAll() {
        return this.userRepository.find();
    }

    getById(id: number) {
        return this.userRepository
            .createQueryBuilder('user')
            .select(['user.email', 'user.photo', 'user.first_name', 'user.last_name'])
            .where('user.id = :id', { id })
            .getOne();
    }
}
