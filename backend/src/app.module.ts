import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { WaterModule } from './water/water.module';

@Module({
  imports: [PrismaModule, WaterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
