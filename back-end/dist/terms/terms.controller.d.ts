import { TermsService } from './terms.service';
import { TermsDTO } from 'src/models/terms.dto';
export declare class TermsController {
    private readonly service;
    constructor(service: TermsService);
    getTermsByCourt(court: number, user: number, start: string, end: string): Promise<import("../models/terms.entity").Term[]>;
    create(termsDTO: TermsDTO): Promise<import("../models/terms.entity").Term>;
}
