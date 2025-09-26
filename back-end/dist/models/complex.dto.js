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
exports.ComplexDTO = void 0;
const class_validator_1 = require("class-validator");
class ComplexDTO {
    name;
    location;
    owner;
    open_time;
    close_time;
    country;
    city;
}
exports.ComplexDTO = ComplexDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ComplexDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ComplexDTO.prototype, "owner", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Matches)(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: "start_time must be in HH:mm:ss format" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], ComplexDTO.prototype, "open_time", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Matches)(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: "end_time must be in HH:mm:ss format" }),
    __metadata("design:type", String)
], ComplexDTO.prototype, "close_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ComplexDTO.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ComplexDTO.prototype, "city", void 0);
//# sourceMappingURL=complex.dto.js.map