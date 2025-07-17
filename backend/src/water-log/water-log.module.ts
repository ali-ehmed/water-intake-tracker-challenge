import { Module } from '@nestjs/common';
import { WaterLogController } from './water-log.controller';
import { WaterLogService } from './water-log.service';
import { CustomPrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WaterLogController],
  providers: [WaterLogService, CustomPrismaService],
  exports: [WaterLogService],
})
export class WaterLogModule {}
