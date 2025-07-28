import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWaterLogDto } from './dto/create-water-log.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class WaterLogService {
  constructor(private prisma: PrismaService) {}

  async upsertWaterLog(dto: CreateWaterLogDto) {
   
    return this.prisma.waterLog.upsert({
      where: {
        userId_date: {
          userId: dto.userId,
          date: new Date(dto.date),
        },
      },
      update: {
        intakeMl: dto.intakeMl,
      },
      create: {
        ...dto,
        date: new Date(dto.date),
      },
    });
  }

  async getWeeklySummary(userId: string) {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);

  const logs = await this.prisma.waterLog.groupBy({
    by: ['date'],
    where: {
      userId,
      date: {
        gte: sevenDaysAgo,
        lte: today,
      },
    },
    _sum: {
      intakeMl: true,
    },
    orderBy: {
      date: 'asc',
    },
  });

  return logs.map((log) => ({
    date: log.date.toISOString().split('T')[0],
    totalIntake: log._sum.intakeMl ?? 0,
    percentageOfGoal: Math.round(((log._sum.intakeMl ?? 0) * 100) / 2000),
  }));
}

}
