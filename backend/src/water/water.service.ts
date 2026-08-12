import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLogDto } from './dto/create-log.dto';
import {
  WaterSummaryResponse,
  WaterSummaryRaw,
} from './types/water-summary.interface';

@Injectable()
export class WaterService {
  constructor(private prisma: PrismaService) {}

  async logWater(dto: CreateLogDto) {
    const existing = await this.prisma.waterLog.findUnique({
      where: { userId_date: { userId: dto.userId, date: dto.date } },
    });

    if (existing) {
      return this.prisma.waterLog.update({
        where: { userId_date: { userId: dto.userId, date: dto.date } },
        data: { intakeMl: existing.intakeMl + dto.intakeMl },
      });
    }

    return this.prisma.waterLog.create({
      data: dto,
    });
  }

  async getWaterSummary(userId: string): Promise<WaterSummaryResponse[]> {
    const summaryRaw = await this.prisma.$queryRawUnsafe<WaterSummaryRaw[]>(`
      SELECT
        date,
        SUM(intakeMl) as totalIntake
      FROM WaterLog
      WHERE userId = '${userId}'
        AND date >= date('now', '-6 days')
      GROUP BY date
      ORDER BY date DESC
    `);

    return summaryRaw.map((entry) => {
      const totalIntake = Number(entry.totalIntake); // Convert BigInt to number

      return {
        date: entry.date,
        totalIntake,
        percentageOfGoal: Math.min(100, Math.round((totalIntake / 2000) * 100)),
      };
    });
  }
}
