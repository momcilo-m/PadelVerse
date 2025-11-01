import { Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SimulatorService } from 'src/simulator/simulator.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly service: UsersService,
        @Inject() private readonly testService: SimulatorService
    ) { }

    @Get()
    getUsers() {
        return this.service.getAll();
    }

    @Get("test")
    test() {
        return this.testService.events();
    }

}
