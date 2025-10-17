import { Type } from "class-transformer";
import { IsDate, IsDefined, IsPositive, Min } from "class-validator";

//complex=${complex}&court=${court}&count=${count}&date=${date}

export class TermsCreateDTO {
    @IsPositive()
    court: number

    @IsPositive()
    complex: number

    @IsPositive()
    user: number

    @IsDate()
    @Type(() => Date)
    date: Date

    @IsDefined()
    time: string;

    @IsPositive()
    @Min(1)
    count: number

}