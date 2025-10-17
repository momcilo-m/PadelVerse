import { TermsService } from './terms.service';
import { TermsCreateDTO } from 'src/models/term.create.dto';
export declare class TermsController {
    private readonly service;
    constructor(service: TermsService);
    getTermsByCourt(court: number, user: number, start: string, end: string): Promise<import("../models/term.entity").Term[]>;
    create(termsDTO: TermsCreateDTO): Promise<import("../models/term.entity").Term>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
