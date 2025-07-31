import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class WaterService {
  constructor(private prisma: PrismaService) {}

  async logWater(dto: CreateLogDto) {
    return this.prisma.waterLog.upsert({
      where: { userId_date: { userId: dto.userId, date: dto.date } },
      update: { intakeMl: dto.intakeMl },
      create: { ...dto },
    });
  }

  async getWeeklySummary(userId: string) {
    return this.prisma.$queryRaw`
      SELECT 
        date,
        SUM(intakeMl) as totalIntake,
        ROUND(SUM(intakeMl) * 100.0 / 2000) as percentageOfGoal
      FROM WaterLog
      WHERE userId = ${userId} AND date >= date('now', '-6 days')
      GROUP BY date
      ORDER BY date ASC
    `;
  }
}
