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
import { ComplexController} from './complex/complex.controller';
import { Complex } from './models/complex.entity';
import { ComplexService} from './complex/complex.service';
import { ComplexModule} from './complex/complex.module';
import { AuthModule } from './auth/auth.module';
import { TermsController } from './terms/terms.controller';
import { TermsService } from './terms/terms.service';
import { TermsModule } from './terms/terms.module';
import { Term } from './models/term.entity';
import { TournamentsModule } from './tournaments/tournaments.module';
import { Tournament } from './models/tournament.entity';
import { TournamentsController } from './tournaments/tournaments.controller';
import { TournamentsService } from './tournaments/tournaments.service';
import { Court } from './models/court.entity';
import { CourtsService } from './courts/courts.service';
import { CourtsModule } from './courts/courts.module';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'momcilo',
      password: 'padelvrese',
      database: 'postgres',
      entities: [User,Complex,Court,Term,Tournament],
      synchronize: false,
    }),
    UsersModule,
    MailerModule,
    ComplexModule,
    AuthModule,
    TermsModule,
    TournamentsModule,
    CourtsModule,
  ],
  controllers: [AppController, UsersController, AuthController, ComplexController, TermsController,TournamentsController],
  providers: [AppService, AuthService, UsersService, MailerService, ComplexService, TermsService, TournamentsService, CourtsService],
})
export class AppModule{}
