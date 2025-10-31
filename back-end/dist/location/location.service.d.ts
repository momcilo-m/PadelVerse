import { HttpService } from '@nestjs/axios';
export declare class LocationService {
    private readonly httpService;
    constructor(httpService: HttpService);
    reverseGeoCoding(lat: number, lng: number): Promise<{
        city: string;
        country: string;
    }>;
}
