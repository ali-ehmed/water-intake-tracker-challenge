import { Controller, Post, Get, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { CreateWaterLogDto } from './dto/create-water-log.dto';

@Controller()
export class WaterLogController {
  constructor(private readonly waterLogService: WaterLogService) {}

  @Post('water-log')
  @HttpCode(HttpStatus.CREATED)
  async createWaterLog(@Body() createWaterLogDto: CreateWaterLogDto) {
    const result = await this.waterLogService.upsertWaterLog(createWaterLogDto);
    return {
      message: 'Water intake logged successfully',
      data: result,
    };
  }

  @Get('water-summary/:userId')
  async getWaterSummary(@Param('userId') userId: string) {
    return this.waterLogService.getWaterSummary(userId);
  }
} 