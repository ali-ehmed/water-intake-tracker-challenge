import { PrismaService } from '../prisma/prisma.service';
import { LogWaterDto } from './dto/log-water.dto';
import { WaterSummaryDto } from './dto/water-summary.dto';
export declare class WaterService {
    private prisma;
    private readonly DAILY_GOAL_ML;
    constructor(prisma: PrismaService);
    logWaterIntake(logWaterDto: LogWaterDto): Promise<void>;
    getWaterSummary(userId: string): Promise<WaterSummaryDto>;
}
