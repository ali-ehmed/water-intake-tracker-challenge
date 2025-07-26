import { Module } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { WaterLogController } from './water-log.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [WaterLogController],
  providers: [WaterLogService, PrismaService],
})
export class WaterLogModule {}
