import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { WaterService } from './water.service';
import { LogWaterDto } from './dto/log-water.dto';
import { WaterSummaryDto } from './dto/water-summary.dto';

@Controller('water')
export class WaterController {
  constructor(private readonly waterService: WaterService) {}

  @Post('log')
  async logWaterIntake(@Body() logWaterDto: LogWaterDto): Promise<{ message: string }> {
    await this.waterService.logWaterIntake(logWaterDto);
    return { message: 'Water intake logged successfully' };
  }

  @Get('summary/:userId')
  async getWaterSummary(@Param('userId') userId: string): Promise<WaterSummaryDto> {
    return this.waterService.getWaterSummary(userId);
  }
} 