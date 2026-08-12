import { Injectable } from '@nestjs/common';
import { CreateWaterLogDto } from './dto/create-water-log.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WaterService {
  constructor(private prisma: PrismaService) {}

  async upsertWaterLog(data: CreateWaterLogDto) {
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

  async getWaterSummary(userId: string) {
    // Calculate timestamps in JavaScript (more reliable)
    const sixDaysAgo = Math.floor(Date.now() / 1000) - 6 * 86400;

    const result = await this.prisma.$queryRaw<
      Array<{
        date: string; // YYYY-MM-DD
        totalIntake: number;
        percentageOfGoal: number;
      }>
    >(Prisma.sql`
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
}
