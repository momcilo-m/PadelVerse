import { IsDefined, IsPositive, MAX, MaxLength } from "class-validator";

export class CourtDTO
{
    @IsDefined()
    @IsPositive()
    complex:number

    @MaxLength(100)
    name:string
}