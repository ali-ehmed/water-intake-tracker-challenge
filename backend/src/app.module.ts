import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WaterModule } from './water/water.module';

@Module({
  imports: [PrismaModule, WaterModule],
})
export class AppModule {} 