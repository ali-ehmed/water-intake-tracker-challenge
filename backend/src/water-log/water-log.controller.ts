import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WaterLogService } from './water-log.service';

@Controller()
export class WaterLogController {
  constructor(private readonly waterLogService: WaterLogService) {}

  @Post('water-log')
  async logWater(
    @Body() body: { userId: string; date: string; intakeMl: number }
  ) {
    return this.waterLogService.upsertWaterLog(body.userId, body.date, body.intakeMl);
  }

  @Get('water-summary/:userId')
  async getSummary(@Param('userId') userId: string) {
    return this.waterLogService.getWeeklySummary(userId);
  }
}
