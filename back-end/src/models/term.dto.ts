import { Type } from "class-transformer";
import { IsDate, IsDefined, IsOptional, IsPositive, Matches, Max, Min } from "class-validator";

export class TermsDTO {
    @IsPositive()
    court: number

    @IsPositive()
    user: number

    @IsDate()
    @Type(() => Date)
    date: Date

    @IsDefined()
    time: string;

    @IsOptional()
    equipment: boolean

    @IsPositive()
    @Min(1)
    count: number

    @IsOptional()
    @Min(2)
    @Max(4)
    players: number

}