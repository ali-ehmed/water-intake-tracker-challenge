import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogWaterDto } from './dto/log-water.dto';
import { WaterSummaryDto, WaterSummaryItemDto } from './dto/water-summary.dto';

@Injectable()
export class WaterService {
  private readonly DAILY_GOAL_ML = 2000;

  constructor(private prisma: PrismaService) {}

  async logWaterIntake(logWaterDto: LogWaterDto): Promise<void> {
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

  async getWaterSummary(userId: string): Promise<WaterSummaryDto> {
    // For now, let's get the existing data and fill in missing days
    const logs = await this.prisma.waterLog.findMany({
      where: { userId },
      orderBy: { date: 'asc' }
    });

    // Generate last 7 days
    const today = new Date();
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    const summary: WaterSummaryItemDto[] = dates.map(date => {
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
} 