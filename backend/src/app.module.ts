import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { WaterModule } from './water/water.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    WaterModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes env available app-wide
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
