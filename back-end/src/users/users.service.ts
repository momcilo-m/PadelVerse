import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/models/user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository:Repository<User> 
    ){}

    getAll()
    {
        return this.userRepository.find();
    }

    getById(id:number)
    {
        return this.userRepository.findBy({id});
    }
}
