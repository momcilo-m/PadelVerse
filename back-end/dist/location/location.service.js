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
exports.LocationService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let LocationService = class LocationService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async reverseGeoCoding(lat, lng) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://us1.locationiq.com/v1/reverse?key=pk.3410b8674f3ccf64df7df13b88a2c20b&lat=${lat}&lon=${lng}&format=json&`));
        let { address } = response.data;
        if (!address || !address.country || (!address.city && !address.village))
            throw new common_1.BadRequestException("Bad Location");
        return { city: address.city || address.village, country: address.country };
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], LocationService);
//# sourceMappingURL=location.service.js.map