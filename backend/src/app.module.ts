import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WaterLogController } from './water-log/water-log.controller';
import { WaterLogService } from './water-log/water-log.service';
import { WaterLogModule } from './water-log/water-log.module';

import { WaterSummaryController } from './water-summary/water-summary.controller';
import { WaterSummaryService } from './water-summary/water-summary.service';
import { WaterSummaryModule } from './water-summary/water-summary.module';

@Module({
  imports: [WaterLogModule, WaterSummaryModule],
  controllers: [WaterLogController, WaterSummaryController],
  providers: [PrismaService, WaterLogService, WaterSummaryService],
})
export class AppModule {}
