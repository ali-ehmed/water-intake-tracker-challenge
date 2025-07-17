import { Module } from '@nestjs/common';
import { WaterSummaryController } from './water-summary.controller';
import { WaterSummaryService } from './water-summary.service';
import { CustomPrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WaterSummaryController],
  providers: [WaterSummaryService, CustomPrismaService],
})
export class WaterSummaryModule {}
