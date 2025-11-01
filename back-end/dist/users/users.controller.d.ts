import { UsersService } from './users.service';
import { SimulatorService } from 'src/simulator/simulator.service';
export declare class UsersController {
    private readonly service;
    private readonly testService;
    constructor(service: UsersService, testService: SimulatorService);
    getUsers(): Promise<import("../models/user.entity").User[]>;
    test(): Promise<void>;
}
