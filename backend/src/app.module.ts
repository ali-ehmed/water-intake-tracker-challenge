import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaterLogModule } from './water-log/water-log.module';
import { CustomPrismaService } from './prisma/prisma.service';
import { WaterSummaryModule } from './water-summary/water-summary.module';

@Module({
  imports: [WaterSummaryModule, WaterLogModule],
  controllers: [AppController],
  providers: [AppService, CustomPrismaService],
})
export class AppModule {}
