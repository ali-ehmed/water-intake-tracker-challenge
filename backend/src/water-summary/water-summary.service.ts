import { Injectable } from '@nestjs/common';
import { CustomPrismaService } from '../prisma/prisma.service';

@Injectable()
export class WaterSummaryService {
  constructor(private prisma: CustomPrismaService) {}

  async getSummary(userId: string) {
    const result = await this.prisma.$queryRaw`
      SELECT
        date(date) as date,
        SUM(intakeMl) as totalIntake,
        ROUND(100.0 * SUM(intakeMl) / 2000.0) as percentageOfGoal
      FROM WaterLog
      WHERE userId = ${userId} 
        AND date BETWEEN date(datetime('now', 'localtime'), '-6 days') 
        AND date(datetime('now', 'localtime'))
      GROUP BY date
      ORDER BY date ASC
    `;
    const safeResult = (result as any[]).map((row: any) => ({
      ...row,
      totalIntake: typeof row.totalIntake === 'bigint' ? Number(row.totalIntake) : row.totalIntake,
      percentageOfGoal: typeof row.percentageOfGoal === 'bigint' ? Number(row.percentageOfGoal) : row.percentageOfGoal,
    }));
    return safeResult;
  }
}
