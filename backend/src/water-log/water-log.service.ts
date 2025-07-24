import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWaterLogDto } from './dto/create-water-log.dto';
import { WaterSummaryDto } from './dto/water-summary.dto';

@Injectable()
export class WaterLogService {
  private readonly DAILY_GOAL_ML = 2000;

  constructor(private prisma: PrismaService) {}

  async upsertWaterLog(createWaterLogDto: CreateWaterLogDto) {
    const { userId, date, intakeMl } = createWaterLogDto;

    return this.prisma.waterLog.upsert({
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

  async getWaterSummary(userId: string): Promise<WaterSummaryDto> {
    // Get the next 7 days (including today) using raw SQL as required
    const result = await this.prisma.$queryRaw<
      Array<{
        date: string;
        totalIntake: number;
        percentageOfGoal: number;
      }>
    >`
      WITH RECURSIVE dates(date) AS (
        SELECT DATE(datetime('now', 'localtime'))
        UNION ALL
        SELECT DATE(date, '+1 day')
        FROM dates
        WHERE date < DATE(datetime('now', 'localtime'), '+7 days')
      )
      SELECT 
        dates.date,
        COALESCE(wl.intakeMl, 0) as totalIntake,
        ROUND(COALESCE(wl.intakeMl, 0) * 100.0 / 2000, 2) as percentageOfGoal
      FROM dates
      LEFT JOIN water_logs wl ON dates.date = wl.date AND wl.userId = ${userId}
      ORDER BY dates.date ASC
    `;

    return {
      data: result.map((row) => ({
        date: row.date,
        totalIntake: Number(row.totalIntake),
        percentageOfGoal: Number(row.percentageOfGoal),
      })),
    };
  }
}
