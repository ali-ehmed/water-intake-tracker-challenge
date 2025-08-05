import { Module } from '@nestjs/common';
import { WaterLogController } from './water-log.controller';
import { WaterLogService } from './water-log.service';
import { PrismaModule } from '../prisma/prisma.module'; 
@Module({
  imports: [PrismaModule],
  controllers: [WaterLogController],
  providers: [WaterLogService],
})
export class WaterLogModule {}
