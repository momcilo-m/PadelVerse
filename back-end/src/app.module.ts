import { Module } from '@nestjs/common';
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

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'momcilo',
      password: 'padelvrese',
      database: 'postgres',
      entities: [User],
      synchronize: true,
    }),
     UsersModule,
     MailerModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, AuthService, UsersService, UsersService, MailerService],
})
export class AppModule {}
