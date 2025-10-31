import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocationService {

    constructor(private readonly httpService: HttpService) {}

    async reverseGeoCoding(lat:number,lng:number):Promise<{city:string, country:string}>
    {
        const response = await firstValueFrom(
            //this.httpService.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=69007ae8e0bd5383641441rco6f2946`)
            this.httpService.get(`https://us1.locationiq.com/v1/reverse?key=pk.3410b8674f3ccf64df7df13b88a2c20b&lat=${lat}&lon=${lng}&format=json&`)
        );

        let {address} = response.data;
        
        if(!address || !address.country  || (!address.city && !address.village))
            throw new BadRequestException("Bad Location");
        return {city:address.city || address.village, country: address.country};
    }
}
