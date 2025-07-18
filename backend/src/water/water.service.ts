import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WaterService {
  constructor(private prisma: PrismaService) {}

  async createWaterLog(userId: number, date: string, intakeMl: number) {
    const existingLog = await this.prisma.water.findUnique({
      where: {
        userId_date: {
          userId,
          date: date,
        },
      },
    });

    if (existingLog) {
      throw new ConflictException(
        'You have already logged water intake for this date.',
      );
    }

    return this.prisma.water.create({
      data: {
        userId,
        date: date,
        intakeMl,
      },
    });
  }

  async getSummary(userId: number) {
    const result = await this.prisma.$queryRaw`
    SELECT
      "date",
      SUM("intakeMl") as "totalIntake",
      ROUND(100.0 * SUM("intakeMl") / 2000.0) as "percentageOfGoal"
    FROM "Water"
    WHERE "userId" = ${userId}
      AND "date" >= DATE('now', '-6 days')
      AND "date" <= DATE('now')
    GROUP BY "date"
    ORDER BY "date" DESC
  `;

    return (result as any[]).map((row) => ({
      date: row.date,
      totalIntake: typeof row.totalIntake === 'bigint' ? Number(row.totalIntake) : row.totalIntake,
      percentageOfGoal: typeof row.percentageOfGoal === 'bigint' ? Number(row.percentageOfGoal) : row.percentageOfGoal,
    }));
  }
}
