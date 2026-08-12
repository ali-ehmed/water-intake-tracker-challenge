import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { PrismaService } from './prisma.service';

@Controller()
export class WaterLogController {
  constructor(private waterLogService: WaterLogService, private prisma: PrismaService) {}

  @Post('water-log')
  async logWater(@Body() body: { userId: string; date: string; intakeMl: number }) {
    const { userId, date, intakeMl } = body;
    return this.waterLogService.upsertWaterLog(userId, date, intakeMl);
  }

  @Get('water-summary/:userId')
  async getSummary(@Param('userId') userId: string) {
    const result = await this.prisma.$queryRaw`\
      SELECT\
        date(date) as date,\
        SUM(intakeMl) as totalIntake,\
        ROUND(100.0 * SUM(intakeMl) / 2000.0) as percentageOfGoal\
      FROM WaterLog\
      WHERE userId = ${userId} \
        AND date BETWEEN date(datetime('now', 'localtime'), '-6 days') \
        AND date(datetime('now', 'localtime'))\
      GROUP BY date\
      ORDER BY date ASC\

    `;
    const safeResult = (result as any[]).map((row: any) => ({
      ...row,
      totalIntake: typeof row.totalIntake === 'bigint' ? Number(row.totalIntake) : row.totalIntake,
      percentageOfGoal: typeof row.percentageOfGoal === 'bigint' ? Number(row.percentageOfGoal) : row.percentageOfGoal,
    }));
    return safeResult;
  }
}
