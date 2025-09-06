"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const complex_entity_1 = require("../models/complex.entity");
const complex_service_1 = require("./complex.service");
const complex_controller_1 = require("./complex.controller");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const terms_module_1 = require("../terms/terms.module");
const courts_module_1 = require("../courts/courts.module");
let ComplexModule = class ComplexModule {
};
exports.ComplexModule = ComplexModule;
exports.ComplexModule = ComplexModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([complex_entity_1.Complex]), users_module_1.UsersModule, auth_module_1.AuthModule, (0, common_1.forwardRef)(() => terms_module_1.TermsModule), courts_module_1.CourtsModule],
        exports: [typeorm_1.TypeOrmModule, complex_service_1.ComplexService],
        providers: [complex_service_1.ComplexService],
        controllers: [complex_controller_1.ComplexController],
    })
], ComplexModule);
//# sourceMappingURL=complex.module.js.map