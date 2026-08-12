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
const create_water_log_dto_1 = require("./dto/create-water-log.dto");
let WaterController = class WaterController {
    waterService;
    constructor(waterService) {
        this.waterService = waterService;
    }
    async createLog(dto) {
        return this.waterService.upsertWaterLog(dto);
    }
    async getSummary(userId) {
        return this.waterService.getWaterSummary(userId);
    }
};
exports.WaterController = WaterController;
__decorate([
    (0, common_1.Post)('water-log'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_water_log_dto_1.CreateWaterLogDto]),
    __metadata("design:returntype", Promise)
], WaterController.prototype, "createLog", null);
__decorate([
    (0, common_1.Get)('water-summary/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WaterController.prototype, "getSummary", null);
exports.WaterController = WaterController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [water_service_1.WaterService])
], WaterController);
//# sourceMappingURL=water.controller.js.map