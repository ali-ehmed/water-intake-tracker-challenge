import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { parse, format } from 'date-fns';
import { WaterLogInterface } from './interfaces/water-log-interface';

@Injectable()
export class WaterLogService {
  constructor(private prisma: PrismaService) {}

  async upsertWaterLog({ date, intakeMl, userId }: WaterLogInterface) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date provided');
    }

    const normalizedDate = new Date(format(parsedDate, 'yyyy-MM-dd'));

    return this.prisma.waterLog.upsert({
      where: {
        userId_date: {
          userId,
          date: normalizedDate,
        },
      },
      update: {
        intakeMl,
        updatedAt: new Date(),
      },
      create: {
        userId,
        date: normalizedDate,
        intakeMl,
      },
    });
  }

  // Temporary function to fetch all water log entries.
  // Used for debugging while verifying date-related logic — took around an hour to resolve due to date issues.
  async getAll() {
    return this.prisma.waterLog.findMany();
  }
}
