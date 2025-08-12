import { TournamentsDTO } from 'src/models/tournament.dto';
import { Tournament } from 'src/models/tournament.entity';
import { Repository } from 'typeorm';
export declare class TournamentsService {
    private readonly tourRepository;
    constructor(tourRepository: Repository<Tournament>);
    getAll(): Promise<Tournament[]>;
    getByName(name: string): Promise<Tournament | null>;
    create(tournamentDTO: TournamentsDTO): Promise<Tournament>;
}
