import { Controller, Get, Param } from '@nestjs/common';
import { WaterSummaryService } from './water-summary.service';

@Controller('water-summary')
export class WaterSummaryController {
  constructor(private waterSummaryService: WaterSummaryService) {}

  @Get(':userId')
  async getSummary(@Param('userId') userId: string) {
    return this.waterSummaryService.getSummary(userId);
  }
}
