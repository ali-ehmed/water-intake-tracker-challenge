import { Controller, Get, Param } from '@nestjs/common';
import { WaterSummaryService } from './water-summary.service';

@Controller('water-summary')
export class WaterSummaryController {
  constructor(private readonly waterSummaryService: WaterSummaryService) {}

  @Get(':userId')
  async getWaterSummary(@Param('userId') userId: string) {
    return this.waterSummaryService.getWaterSummary(userId);
  }
}
