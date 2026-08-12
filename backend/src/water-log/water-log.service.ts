import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWaterLogDto } from './create-water-log.dto';
import { startOfDay, subDays } from 'date-fns'; 


@Injectable()
export class WaterLogService {
   constructor(private prisma: PrismaService) {}
  async logWater(dto: CreateWaterLogDto) {
    try {
      const dateStr = new Date(dto.date).toISOString().split('T')[0];
      return await this.prisma.waterLog.upsert({
        where: { userId_date: { userId: dto.userId, date: dateStr } },
        update: { intakeMl: dto.intakeMl },
        create: {
          userId: dto.userId,
          date: dateStr,
          intakeMl: dto.intakeMl,
        },
      });
    } catch (error) {
      throw new ConflictException('Water log already exists');
    }
  }

  async getWeeklySummary(userId: string) {
     return await this.prisma.waterLog.findMany({
      where: { userId },
    });
  }
}
