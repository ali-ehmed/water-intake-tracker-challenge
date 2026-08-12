import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { WaterService } from './water.service';
import { WaterLogDto } from './dto/water-log.dto';
import { WaterSummaryItemDto } from './dto/water-summary.dto';

@Controller('water')
export class WaterController {
  constructor(private readonly waterService: WaterService) {}

  @Post('log')
  async logWaterIntake(@Body() waterLogDto: WaterLogDto) {
    return await this.waterService.logWaterIntake(waterLogDto);
  }

  @Get('summary/:userId')
  async getWeeklySummary(@Param('userId') userId: string): Promise<WaterSummaryItemDto[]> {
    return await this.waterService.getWeeklySummary(userId);
  }
} 