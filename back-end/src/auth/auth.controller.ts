import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { UserDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly service: AuthService) {}

    @Post('/register')
    async register(@Body(new ValidationPipe({transform:true})) userDTO:UserDTO)
    {   
        return this.service.create(userDTO);
    }

    @Get('/confirmRegistration/:token')
    async confirmRegister(@Param('token')token:string)
    {
        return this.service.activateUser(token);
    }
}
