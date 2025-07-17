import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaterLogController } from './water-log.controller';
import { WaterLogService } from './water-log.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, WaterLogController],
  providers: [AppService, WaterLogService, PrismaService],
})
export class AppModule {}
