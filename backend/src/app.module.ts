import { Module } from '@nestjs/common';
import { WaterLogModule } from './water-log/water-log.module';

@Module({
  imports: [WaterLogModule],
})
export class AppModule {}
