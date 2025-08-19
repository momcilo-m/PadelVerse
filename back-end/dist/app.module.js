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
const courts_controller_1 = require("./courts/courts.controller");
const court_entity_1 = require("./models/court.entity");
const courts_service_1 = require("./courts/courts.service");
const courts_module_1 = require("./courts/courts.module");
const auth_module_1 = require("./auth/auth.module");
const terms_controller_1 = require("./terms/terms.controller");
const terms_service_1 = require("./terms/terms.service");
const terms_module_1 = require("./terms/terms.module");
const term_entity_1 = require("./models/term.entity");
const tournaments_module_1 = require("./tournaments/tournaments.module");
const tournament_entity_1 = require("./models/tournament.entity");
const tournaments_controller_1 = require("./tournaments/tournaments.controller");
const tournaments_service_1 = require("./tournaments/tournaments.service");
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
                entities: [user_entity_1.User, court_entity_1.Court, term_entity_1.Term, tournament_entity_1.Tournament],
                synchronize: false,
            }),
            users_module_1.UsersModule,
            mailer_module_1.MailerModule,
            courts_module_1.CourtsModule,
            auth_module_1.AuthModule,
            terms_module_1.TermsModule,
            tournaments_module_1.TournamentsModule,
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController, auth_controller_1.AuthController, courts_controller_1.CourtsController, terms_controller_1.TermsController, tournaments_controller_1.TournamentsController],
        providers: [app_service_1.AppService, auth_service_1.AuthService, users_service_1.UsersService, mailer_service_1.MailerService, courts_service_1.CourtsService, terms_service_1.TermsService, tournaments_service_1.TournamentsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map