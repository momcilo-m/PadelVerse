import { ComplexService } from 'src/complex/complex.service';
import { CourtsService } from 'src/courts/courts.service';
import { TermsDTO } from 'src/models/term.dto';
import { Term } from 'src/models/term.entity';
import { Repository } from 'typeorm';
export declare class TermsService {
    private readonly termsRepository;
    private readonly courtService;
    private readonly complexService;
    constructor(termsRepository: Repository<Term>, courtService: CourtsService, complexService: ComplexService);
    getByIds(court?: number, user?: number, start_date?: Date, end_date?: Date): Promise<Term[]>;
    create(termsDTO: TermsDTO): Promise<Term>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
