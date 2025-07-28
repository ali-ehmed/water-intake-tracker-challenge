import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { CreateWaterLogDto } from './dto/create-water-log.dto';

@Controller()
export class WaterLogController {
  constructor(private readonly service: WaterLogService) {}

  @Post('water-log')
  create(@Body() dto: CreateWaterLogDto) {
    return this.service.upsertWaterLog(dto);
  }

  @Get('water-summary/:userId')
  summary(@Param('userId') userId: string) {
    return this.service.getWeeklySummary(userId);
  }
}
