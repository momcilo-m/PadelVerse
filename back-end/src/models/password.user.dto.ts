import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class PasswordUserDTO
{
    @IsEmail()
    email:string;
    
    @IsString()
    password:string;

    @IsStrongPassword()
    newPassword:string

    @IsStrongPassword()
    confirmPassword:string    
}