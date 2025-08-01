// src/water-log/water-log.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WaterLogService } from './water-log.service';

@Controller('water-log')
export class WaterLogController {
    constructor(private readonly waterLogService: WaterLogService) { }

    @Post()
    async logWater(@Body() body: { userId: string; date: string; intakeMl: number }) {
        const { userId, date, intakeMl } = body;
        const result = await this.waterLogService.upsertWaterLog(userId, date, intakeMl);
        return {
            message: 'Water log saved',
            data: result,
        };

    }
    @Get('/summary/:userId')
    async getSummary(@Param('userId') userId: string) {
        console.log(`Fetching water summary for user: ${userId}`);
        console.log(typeof userId, userId);
        
        
        const data = await this.waterLogService.getWaterSummary(userId);
        return { data };
    }
}
