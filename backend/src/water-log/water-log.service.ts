import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WaterLogService {
  constructor(private prisma: PrismaService) {}

  async upsertWaterLog(userId: string, date: string, intakeMl: number) {
    return this.prisma.waterLog.upsert({
      where: { userId_date: { userId, date } },
      update: { intakeMl },
      create: { userId, date, intakeMl },
    });
  }

  async getWeeklySummary(userId: string) {
    // Use raw SQL for the last 7 days
    const result = await this.prisma.$queryRaw<
      Array<{ date: string; totalIntake: number }>
    >`
      SELECT
        date,
        SUM(intakeMl) as totalIntake
      FROM WaterLog
      WHERE userId = ${userId}
        AND date >= date('now', '-6 days')
      GROUP BY date
      ORDER BY date ASC
    `;

    // Fill missing days and calculate percentage
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().slice(0, 10);
    });

    const summary = days.map(date => {
      const log = result.find(r => r.date === date);
      const totalIntake = log ? Number(log.totalIntake) : 0;
      return {
        date,
        totalIntake,
        percentageOfGoal: Math.min(100, Math.round((totalIntake / 2000) * 100)),
      };
    });

    return summary;
  }
}
