import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersModule } from './users/users.module';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { CourtsController } from './courts/courts.controller';
import { Court } from './models/court.entity';
import { CourtsService } from './courts/courts.service';
import { CourtsModule } from './courts/courts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'momcilo',
      password: 'padelvrese',
      database: 'postgres',
      entities: [User,Court],
      synchronize: true,
    }),
    UsersModule,
    MailerModule,
    CourtsModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController, AuthController, CourtsController],
  providers: [AppService, AuthService, UsersService, MailerService, AuthGuard, CourtsService],
})
export class AppModule{}
