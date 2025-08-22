import { ComplexService } from './complex.service';
import { ComplexDTO } from 'src/models/complex.dto';
export declare class ComplexController {
    private readonly service;
    constructor(service: ComplexService);
    getAllComplex(query: Record<string, any>): Promise<any>;
    getById(id: number): Promise<import("../models/complex.entity").Complex | null>;
    createCourt(req: any, complexDTO: ComplexDTO): Promise<import("../models/complex.entity").Complex>;
    editCourt(req: any, complexDTO: ComplexDTO, id: number): Promise<import("@nestjs/common").BadRequestException | {
        success: boolean;
        message: string;
    }>;
}
