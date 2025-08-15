import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional, IsPositive, Max, MaxLength, Min, MinLength } from "class-validator";

export class TournamentsDTO
{
    @IsDefined()
    @MinLength(3)
    @MaxLength(100)
    name:string

    @IsDefined()
    @Type(()=>Date)    
    start:string
    
    @IsDefined()
    @Type(()=>Date)
    end:string

    @IsDefined()
    @MinLength(3)
    @MaxLength(50)
    country:string

    @IsOptional()
    @MaxLength(50)
    city:string

    @IsNotEmpty()
    court:number[]
}