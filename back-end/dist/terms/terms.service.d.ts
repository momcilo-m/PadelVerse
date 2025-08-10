import { CourtsService } from 'src/courts/courts.service';
import { TermsDTO } from 'src/models/terms.dto';
import { Term } from 'src/models/terms.entity';
import { Repository } from 'typeorm';
export declare class TermsService {
    private readonly termsRepository;
    private readonly courtService;
    constructor(termsRepository: Repository<Term>, courtService: CourtsService);
    getByIds(court?: number, user?: number, start_date?: Date, end_date?: Date): Promise<Term[]>;
    create(termsDTO: TermsDTO): Promise<Term>;
}
