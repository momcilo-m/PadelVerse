import { CourtsService } from 'src/courts/courts.service';
import { TermsDTO } from 'src/models/term.dto';
import { Term } from 'src/models/term.entity';
import { Repository } from 'typeorm';
export declare class TermsService {
    private readonly termsRepository;
    private readonly courtService;
    constructor(termsRepository: Repository<Term>, courtService: CourtsService);
    getByIds(court?: number, user?: number, start_date?: Date, end_date?: Date): Promise<Term[]>;
    create(termsDTO: TermsDTO): Promise<Term>;
}
