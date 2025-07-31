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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterController = void 0;
const common_1 = require("@nestjs/common");
const water_service_1 = require("./water.service");
const log_water_dto_1 = require("./dto/log-water.dto");
let WaterController = class WaterController {
    constructor(waterService) {
        this.waterService = waterService;
    }
    async logWaterIntake(logWaterDto) {
        await this.waterService.logWaterIntake(logWaterDto);
        return { message: 'Water intake logged successfully' };
    }
    async getWaterSummary(userId) {
        return this.waterService.getWaterSummary(userId);
    }
};
exports.WaterController = WaterController;
__decorate([
    (0, common_1.Post)('log'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_water_dto_1.LogWaterDto]),
    __metadata("design:returntype", Promise)
], WaterController.prototype, "logWaterIntake", null);
__decorate([
    (0, common_1.Get)('summary/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WaterController.prototype, "getWaterSummary", null);
exports.WaterController = WaterController = __decorate([
    (0, common_1.Controller)('water'),
    __metadata("design:paramtypes", [water_service_1.WaterService])
], WaterController);
//# sourceMappingURL=water.controller.js.map