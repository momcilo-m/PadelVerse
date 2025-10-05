import { IsDate, IsDefined, IsNumber, IsOptional, IsPositive, Matches, MaxLength, Min } from "class-validator";

export class ComplexDTO {

    @IsOptional()
    @MaxLength(50)
    name?: string;

    location: string

    @IsNumber()
    @Min(1)
    owner: number;

    @IsDefined()
    @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: "open_time must be in HH:mm:ss format" })
    open_time: string;

    @IsDefined()
    @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: "end_time must be in HH:mm:ss format" })
    close_time: string;

    // @IsPositive()
    // @Min(1)
    // price:number

    @IsOptional()
    country: string

    @IsOptional()
    city: string


}