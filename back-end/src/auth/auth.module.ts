import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { AuthService } from './auth.service';
import { MailerService } from 'src/mailer/mailer.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailerModule } from 'src/mailer/mailer.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
    MailerModule
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}
