import { Body, Controller, Get, HttpCode, Param, Patch, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import type { Response } from 'express';
import { UserDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PasswordUserDTO } from 'src/models/password.user.dto';

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
    async login(@Body('email')email:string, @Body('password')password:string, @Res({ passthrough: true }) response: Response)
    {
        const res = await  this.service.login(email,password); 
        if(res.token)
        {
             response.cookie('jwt', res.token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            });
        }
        return res 
    }

    @HttpCode(200)
    @Get("/me")
    @UseGuards(JwtAuthGuard)
    me(@Req()req:any)
    {
        return this.service.isLogin(req);
    }

    @HttpCode(200)
    @Patch("change-password")
    @UseGuards(JwtAuthGuard)
    changePassword(@Req()req:any, @Body(new ValidationPipe({whitelist:true}))user:PasswordUserDTO)
    {
        user.email = req.user.email;
        return this.service.changePassword(user);
    }   
}
