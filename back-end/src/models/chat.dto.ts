import { IsPositive, Min, MinLength } from "class-validator";

export class ChatDTO {

    user: number;

    @IsPositive()
    match: number;

    @MinLength(1)
    message: string

    time?: number;
}