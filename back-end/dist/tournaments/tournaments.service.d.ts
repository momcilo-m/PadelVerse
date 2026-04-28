import { ComplexService } from 'src/complex/complex.service';
import { Tournament } from 'src/models/tournament.entity';
import { Repository } from 'typeorm';
export declare class TournamentsService {
    private readonly tourRepository;
    private readonly courtService;
    constructor(tourRepository: Repository<Tournament>, courtService: ComplexService);
    getAll(): Promise<Tournament[]>;
    getByName(name: string): Promise<Tournament | null>;
}
