import { Module } from '@nestjs/common';
import { WaterController } from './water.controller';
import { WaterService } from './water.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WaterController],
  providers: [WaterService, PrismaService],
})
export class WaterModule {}
