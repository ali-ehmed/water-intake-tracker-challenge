import { Module } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { WaterLogController } from './water-log.controller';

@Module({
  controllers: [WaterLogController],
  providers: [WaterLogService],
})
export class WaterLogModule {}
