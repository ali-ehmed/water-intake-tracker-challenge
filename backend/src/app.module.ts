import { Module } from '@nestjs/common';
import { WaterLogModule } from './water-log/water-log.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, WaterLogModule],
})
export class AppModule {}
