import { Module } from '@nestjs/common';
import { WaterModule } from './water/water.module';

@Module({
  imports: [WaterModule],
})
export class AppModule {} 