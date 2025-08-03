import { Body, Controller, Get, Post } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { CreateWaterLogDto } from './dto/create-water-log.dto';
import { WaterLogsInterface } from './interfaces/water-log-interface';

@Controller('')
export class WaterLogController {
  constructor(private readonly waterLogService: WaterLogService) {}

  @Post('water-log')
  async upsertWaterLog(@Body() body: CreateWaterLogDto) {
    return this.waterLogService.upsertWaterLog({
      userId: body.userId,
      date: body.date,
      intakeMl: body.intakeMl,
    });
  }

  @Get('get-all-water-logs')
  async getAll(): Promise<WaterLogsInterface[]> {
    return await this.waterLogService.getAll();
  }
}
