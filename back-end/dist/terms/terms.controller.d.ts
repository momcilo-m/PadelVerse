import { TermsService } from './terms.service';
import { TermsDTO } from 'src/models/term.dto';
export declare class TermsController {
    private readonly service;
    constructor(service: TermsService);
    getTermsByCourt(court: number, user: number, start: string, end: string): Promise<import("../models/term.entity").Term[]>;
    create(termsDTO: TermsDTO): Promise<import("../models/term.entity").Term>;
}
