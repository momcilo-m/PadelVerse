import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsPhoneNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"
import { IsHaveAge } from "./age.decorator";
import { IsMatch } from "./match.decorator";

export class UserDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    first_name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    last_name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsMatch('password', { message: "Password do not match" })
    confirm_password: string;

    @IsPhoneNumber()
    phone: string;

    @Type(() => Date)
    @IsDate()
    @IsHaveAge(12, { message: "User must have 12+ years" })
    birth: Date;

    @Type(() => Boolean)
    @IsBoolean()
    gender: Boolean
}