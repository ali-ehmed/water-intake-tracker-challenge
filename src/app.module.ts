import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { WaterLogService } from './waterLog/water-log.service';
import { WaterLogController } from './waterLog/water-log.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController,UserController, AuthController, WaterLogController],
  providers: [AppService, UserService, AuthService, WaterLogService, PrismaService],
})
export class AppModule {}
