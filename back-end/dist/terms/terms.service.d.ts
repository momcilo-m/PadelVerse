import { ComplexService } from 'src/complex/complex.service';
import { CourtsService } from 'src/courts/courts.service';
import { TermsCreateDTO } from 'src/models/term.create.dto';
import { Term } from 'src/models/term.entity';
import { Repository } from 'typeorm';
export declare class TermsService {
    private readonly termsRepository;
    private readonly complexService;
    private readonly courtService;
    constructor(termsRepository: Repository<Term>, complexService: ComplexService, courtService: CourtsService);
    getByIds(court?: number, user?: number, start_date?: Date, end_date?: Date): Promise<Term[]>;
    create(termsDTO: TermsCreateDTO): Promise<Term>;
    isTermFree(startTime: string, endTime: string, date: Date, courtId: number): Promise<Boolean>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
