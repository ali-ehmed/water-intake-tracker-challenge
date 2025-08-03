import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { WaterSummaryController } from './water-summary.controller';
import { WaterSummaryService } from './water-summary.service';

@Module({
  imports: [PrismaModule],
  providers: [WaterSummaryService],
  controllers: [WaterSummaryController],
})
export class WaterSummaryModule {}
