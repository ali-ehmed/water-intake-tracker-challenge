import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

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

  async getSummary(userId: string) {
    // This will be implemented using prisma.$queryRaw in the controller for full control
    return [];
  }
}
