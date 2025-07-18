import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { WaterService } from './water.service';
import { CreateWaterLogDto } from './dto/create-water-log.dto';
import { GetWaterSummaryDto } from './dto/get-water-summary.dto';
import { WaterSummaryResponseDto } from './dto/water-summary-response.dto';

@Controller()
export class WaterController {
  constructor(private waterService: WaterService) {}

  @Post('water-log')
  async logWater(@Body(ValidationPipe) createWaterLogDto: CreateWaterLogDto) {
    const { userId, date, intakeMl } = createWaterLogDto;
    return this.waterService.createWaterLog(userId, date, intakeMl);
  }

  @Get('water-summary/:userId')
  async getSummary(
    @Param(ValidationPipe) params: GetWaterSummaryDto
  ): Promise<WaterSummaryResponseDto[]> {
    return this.waterService.getSummary(params.userId);
  }
}
