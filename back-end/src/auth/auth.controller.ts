import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly service: AuthService) {}

    @HttpCode(201)
    @Post('/register')
    register(@Body(new ValidationPipe({transform:true})) userDTO:UserDTO)
    {   
        return this.service.create(userDTO);
    }

    @HttpCode(200)
    @Get('/confirmRegistration/:token')
    confirmRegister(@Param('token')token:string)
    {
        return this.service.activateUser(token);
    }

    @HttpCode(200)
    @Post("/login")
    login(@Body('email')email:string, @Body('password')password:string)
    {
        return this.service.login(email,password);
    }

    @HttpCode(200)
    @Get("/me")
    @UseGuards(JwtAuthGuard)
    me(@Req()req:any)
    {
        return this.service.isLogin(req);
    }
}
