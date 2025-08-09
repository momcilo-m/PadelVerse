import { CourtsService } from './courts.service';
import { CourtDTO } from 'src/models/court.dto';
export declare class CourtsController {
    private readonly service;
    constructor(service: CourtsService);
    getAllCourts(): Promise<import("../models/court.entity").Court[]>;
    getById(id: number): Promise<import("../models/court.entity").Court | null>;
    createCourt(req: any, courtDTO: CourtDTO): Promise<import("../models/court.entity").Court>;
    editCourt(req: any, courtDTO: CourtDTO, id: number): Promise<import("@nestjs/common").BadRequestException | {
        success: boolean;
        message: string;
    }>;
}
