import { Type } from "class-transformer";
import { IsDefined, IsOptional, IsPositive, Max, Min } from "class-validator";

export class TournamentsDTO
{
    @IsPositive()
    id:number

    @Min(3)
    @Max(100)
    name:string

    @IsDefined()
    @Type(()=>Date)    
    start:string
    
    @IsDefined()
    @Type(()=>Date)
    end:string

    @Min(3)
    @Max(50)
    country:string

    @IsOptional()
    @Max(50)
    city:string
}