import { Type } from "class-transformer";
import { IsDate, IsDefined, IsPositive, Matches, Max, Min } from "class-validator";

export class TermsDTO
{
    @IsPositive()
    court:number
    
    @IsPositive()
    user:number
    
    @IsDate()
    @Type(()=>Date)
    date:Date
    
    @IsDefined()
    time: string;

    @IsDefined()
    equipment:boolean

    @IsPositive()
    @Min(1)
    count:number

    @IsPositive()
    @Min(2)
    @Max(4)
    players:number

}