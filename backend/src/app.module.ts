import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WaterLogModule } from './water-log/water-log.module';


@Module({
  imports: [PrismaModule, WaterLogModule],
})
export class AppModule {}
