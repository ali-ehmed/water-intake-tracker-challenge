import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaterModule } from './water/water.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [WaterModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
