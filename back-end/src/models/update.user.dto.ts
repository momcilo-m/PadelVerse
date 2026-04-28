import {IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";


export class UpdateUserDTO
{
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    first_name:string;
    
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    last_name:string;
    
    @IsOptional()
    @IsEmail()
    email:string;
    
    @IsOptional()
    @IsPhoneNumber()
    phone:string;
}