"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class TermsDTO {
    court;
    user;
    date;
    time;
    equipment;
    count;
}
exports.TermsDTO = TermsDTO;
__decorate([
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], TermsDTO.prototype, "court", void 0);
__decorate([
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], TermsDTO.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TermsDTO.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], TermsDTO.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Boolean)
], TermsDTO.prototype, "equipment", void 0);
__decorate([
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TermsDTO.prototype, "count", void 0);
//# sourceMappingURL=terms.dto.js.map