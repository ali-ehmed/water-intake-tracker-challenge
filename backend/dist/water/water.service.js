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
exports.WaterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WaterService = class WaterService {
    constructor(prisma) {
        this.prisma = prisma;
        this.DAILY_GOAL_ML = 2000;
    }
    async logWaterIntake(logWaterDto) {
        const { userId, date, intakeMl } = logWaterDto;
        await this.prisma.waterLog.upsert({
            where: {
                userId_date: {
                    userId,
                    date,
                },
            },
            update: {
                intakeMl,
            },
            create: {
                userId,
                date,
                intakeMl,
            },
        });
    }
    async getWaterSummary(userId) {
        const logs = await this.prisma.waterLog.findMany({
            where: { userId },
            orderBy: { date: 'asc' }
        });
        const today = new Date();
        const dates = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split('T')[0]);
        }
        const summary = dates.map(date => {
            const log = logs.find(l => l.date === date);
            const totalIntake = log ? log.intakeMl : 0;
            return {
                date,
                totalIntake,
                percentageOfGoal: Math.round((totalIntake / this.DAILY_GOAL_ML) * 100),
            };
        });
        return {
            userId,
            summary,
        };
    }
};
exports.WaterService = WaterService;
exports.WaterService = WaterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WaterService);
//# sourceMappingURL=water.service.js.map