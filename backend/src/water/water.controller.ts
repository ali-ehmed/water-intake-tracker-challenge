import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WaterService } from './water.service';
import { CreateWaterLogDto } from './dto/create-water-log.dto';

@Controller()
export class WaterController {
  constructor(private readonly waterService: WaterService) {}

  @Post('water-log')
  async createLog(@Body() dto: CreateWaterLogDto) {
    return this.waterService.upsertWaterLog(dto);
  }

  @Get('water-summary/:userId')
  async getSummary(@Param('userId') userId: string) {
    return this.waterService.getWaterSummary(userId);
  }
}
