import { ComplexService } from './complex.service';
import { ComplexDTO } from 'src/models/complex.dto';
import { CourtDTO } from 'src/models/court.dto';
import { CourtsService } from 'src/courts/courts.service';
export declare class ComplexController {
    private readonly service;
    private readonly courtService;
    constructor(service: ComplexService, courtService: CourtsService);
    getFreeCourts(complex: number, startTime: string, date: string, count: number): Promise<never[] | {
        all: import("../models/court.entity").Court[];
        available: number[];
    }>;
    getAllComplex(query: Record<string, any>): Promise<any>;
    getById(id: number): Promise<import("../models/complex.entity").Complex>;
    createComplex(req: any, complexDTO: ComplexDTO): Promise<import("../models/complex.entity").Complex>;
    editCourt(req: any, complexDTO: ComplexDTO, id: number): Promise<import("@nestjs/common").BadRequestException | Partial<import("../models/complex.entity").Complex>>;
    createCourt(req: any, courtDTO: CourtDTO): Promise<import("../models/court.entity").Court>;
    uploadComplex(req: any, file: Express.Multer.File, id: number): Promise<{
        message: string;
        filename: string;
        path: string;
    }>;
}
