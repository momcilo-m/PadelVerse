import { Type } from "class-transformer";
import { isBoolean, IsDate, IsDefined, IsPositive, Matches, Min } from "class-validator";

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
}