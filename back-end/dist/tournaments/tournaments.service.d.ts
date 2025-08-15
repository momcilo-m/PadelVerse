import { CourtsService } from 'src/courts/courts.service';
import { TournamentsDTO } from 'src/models/tournament.dto';
import { Tournament } from 'src/models/tournament.entity';
import { Repository } from 'typeorm';
export declare class TournamentsService {
    private readonly tourRepository;
    private readonly courtService;
    constructor(tourRepository: Repository<Tournament>, courtService: CourtsService);
    getAll(): Promise<Tournament[]>;
    getByName(name: string): Promise<Tournament | null>;
    create(tournamentDTO: TournamentsDTO): Promise<Tournament>;
}
