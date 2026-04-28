import { IsDefined, IsPositive, MAX, MaxLength, Min } from "class-validator";

export class CourtDTO
{
    @IsDefined()
    @IsPositive()
    complex:number

    @MaxLength(100)
    name:string
    
    @IsPositive()
    @Min(1)
    price:number
}