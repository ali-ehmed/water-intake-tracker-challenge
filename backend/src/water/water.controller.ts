import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WaterService } from './water.service';
import { CreateLogDto } from './dto/create-log.dto';

@Controller()
export class WaterController {
  constructor(private readonly waterService: WaterService) {}

  @Post('water-log')
  logWater(@Body() dto: CreateLogDto) {
    return this.waterService.logWater(dto);
  }

  @Get('water-summary/:userId')
  getSummary(@Param('userId') userId: string) {
    return this.waterService.getWeeklySummary(userId);
  }
}