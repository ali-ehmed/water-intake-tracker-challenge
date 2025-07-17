import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { CustomPrismaService } from '../prisma/prisma.service';

import { WaterLogDto } from './dto/water-log.dto';

@Controller()
export class WaterLogController {
  constructor(private waterLogService: WaterLogService, private prisma: CustomPrismaService) {}

  @Post('water-log')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async logWater(@Body() body: WaterLogDto) {
    const { userId, date, intakeMl } = body;
    return this.waterLogService.upsertWaterLog(userId, date, intakeMl);
  }

}
