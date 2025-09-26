"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const users_service_1 = require("./users/users.service");
const users_controller_1 = require("./users/users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./models/user.entity");
const users_module_1 = require("./users/users.module");
const mailer_service_1 = require("./mailer/mailer.service");
const mailer_module_1 = require("./mailer/mailer.module");
const complex_controller_1 = require("./complex/complex.controller");
const complex_entity_1 = require("./models/complex.entity");
const complex_service_1 = require("./complex/complex.service");
const complex_module_1 = require("./complex/complex.module");
const auth_module_1 = require("./auth/auth.module");
const terms_controller_1 = require("./terms/terms.controller");
const terms_service_1 = require("./terms/terms.service");
const terms_module_1 = require("./terms/terms.module");
const term_entity_1 = require("./models/term.entity");
const tournaments_module_1 = require("./tournaments/tournaments.module");
const tournament_entity_1 = require("./models/tournament.entity");
const tournaments_controller_1 = require("./tournaments/tournaments.controller");
const tournaments_service_1 = require("./tournaments/tournaments.service");
const court_entity_1 = require("./models/court.entity");
const courts_service_1 = require("./courts/courts.service");
const courts_module_1 = require("./courts/courts.module");
const config_1 = require("@nestjs/config");
const booking_controller_1 = require("./booking/booking.controller");
const booking_module_1 = require("./booking/booking.module");
const profile_module_1 = require("./profile/profile.module");
const profile_controller_1 = require("./profile/profile.controller");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const stats_module_1 = require("./stats/stats.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'momcilo',
                password: 'padelvrese',
                database: 'postgres',
                entities: [user_entity_1.User, complex_entity_1.Complex, court_entity_1.Court, term_entity_1.Term, tournament_entity_1.Tournament],
                synchronize: false,
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: "./../.env",
                isGlobal: true
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/',
            }),
            users_module_1.UsersModule,
            mailer_module_1.MailerModule,
            complex_module_1.ComplexModule,
            auth_module_1.AuthModule,
            terms_module_1.TermsModule,
            tournaments_module_1.TournamentsModule,
            courts_module_1.CourtsModule,
            booking_module_1.BookingModule,
            profile_module_1.ProfileModule,
            stats_module_1.StatsModule,
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController, auth_controller_1.AuthController, complex_controller_1.ComplexController, terms_controller_1.TermsController, tournaments_controller_1.TournamentsController, booking_controller_1.BookingController, profile_controller_1.ProfileController],
        providers: [app_service_1.AppService, auth_service_1.AuthService, users_service_1.UsersService, mailer_service_1.MailerService, complex_service_1.ComplexService, terms_service_1.TermsService, tournaments_service_1.TournamentsService, courts_service_1.CourtsService, profile_controller_1.ProfileController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map