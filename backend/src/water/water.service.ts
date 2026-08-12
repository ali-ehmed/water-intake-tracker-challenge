import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WaterLogDto } from './dto/water-log.dto';
import { WaterSummaryItemDto } from './dto/water-summary.dto';

@Injectable()
export class WaterService {
  private prisma = new PrismaClient();
  private readonly DAILY_GOAL_ML = 2000;

  async logWaterIntake(waterLogDto: WaterLogDto) {
    const { userId, date, intakeMl } = waterLogDto;
    
    return await this.prisma.waterLog.upsert({
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

  async getWeeklySummary(userId: string): Promise<WaterSummaryItemDto[]> {
    // Using raw SQL as required in the challenge
    const result = await this.prisma.$queryRaw<Array<{
      date: string;
      totalIntake: number;
    }>>`
      SELECT 
        date,
        intakeMl as totalIntake
      FROM WaterLog 
      WHERE userId = ${userId}
        AND date >= date('now', '-6 days')
        AND date <= date('now')
      ORDER BY date ASC
    `;

    // Fill in missing dates with 0 intake
    const summary: WaterSummaryItemDto[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const existingLog = result.find(log => log.date === dateStr);
      const totalIntake = existingLog ? existingLog.totalIntake : 0;
      const percentageOfGoal = Math.round((totalIntake / this.DAILY_GOAL_ML) * 100);
      
      summary.push({
        date: dateStr,
        totalIntake,
        percentageOfGoal,
      });
    }

    return summary;
  }
} 