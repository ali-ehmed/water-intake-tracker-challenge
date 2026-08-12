import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { CreateWaterLogDto } from './create-water-log.dto';

@Controller()
export class WaterLogController {
  constructor(private readonly waterLogService: WaterLogService) {}

  @Post('water-log') // POST /water-log
  logWater(@Body() dto: CreateWaterLogDto) {
    return this.waterLogService.logWater(dto);
  }

  @Get('water-summary/:userId') // GET /water-summary/1
  getSummary(@Param('userId') userId: string) {
    return this.waterLogService.getWeeklySummary(userId);
  }
}
