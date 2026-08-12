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
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let WaterService = class WaterService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async upsertWaterLog(data) {
        const { userId, date, intakeMl } = data;
        const logTimestamp = Math.floor(new Date(date).getTime() / 1000);
        return this.prisma.waterLog.upsert({
            where: {
                userId_date: {
                    userId,
                    date: logTimestamp,
                },
            },
            update: { intakeMl },
            create: {
                userId,
                date: logTimestamp,
                intakeMl,
            },
        });
    }
    async getWaterSummary(userId) {
        const sixDaysAgo = Math.floor(Date.now() / 1000) - 6 * 86400;
        const result = await this.prisma.$queryRaw(client_1.Prisma.sql `
      SELECT
        substr(datetime(date, 'unixepoch'), 1, 10) as date,
        CAST(SUM(intakeMl) AS FLOAT) as totalIntake,
        ROUND(CAST(SUM(intakeMl) AS FLOAT) * 100.0 / 2000, 2) as percentageOfGoal
      FROM WaterLog
      WHERE userId = ${userId}
        AND date >= ${sixDaysAgo}
      GROUP BY date
      ORDER BY date ASC
  `);
        return result;
    }
};
exports.WaterService = WaterService;
exports.WaterService = WaterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WaterService);
//# sourceMappingURL=water.service.js.map