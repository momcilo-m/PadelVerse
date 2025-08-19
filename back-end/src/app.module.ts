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
import { CourtsController } from './courts/courts.controller';
import { Court } from './models/court.entity';
import { CourtsService } from './courts/courts.service';
import { CourtsModule } from './courts/courts.module';
import { AuthModule } from './auth/auth.module';
import { TermsController } from './terms/terms.controller';
import { TermsService } from './terms/terms.service';
import { TermsModule } from './terms/terms.module';
import { Term } from './models/term.entity';
import { TournamentsModule } from './tournaments/tournaments.module';
import { Tournament } from './models/tournament.entity';
import { TournamentsController } from './tournaments/tournaments.controller';
import { TournamentsService } from './tournaments/tournaments.service';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'momcilo',
      password: 'padelvrese',
      database: 'postgres',
      entities: [User,Court,Term,Tournament],
      synchronize: false,
    }),
    UsersModule,
    MailerModule,
    CourtsModule,
    AuthModule,
    TermsModule,
    TournamentsModule,
  ],
  controllers: [AppController, UsersController, AuthController, CourtsController, TermsController,TournamentsController],
  providers: [AppService, AuthService, UsersService, MailerService, CourtsService, TermsService, TournamentsService],
})
export class AppModule{}
