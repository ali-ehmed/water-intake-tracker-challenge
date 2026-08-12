import { WaterService } from './water.service';
import { LogWaterDto } from './dto/log-water.dto';
import { WaterSummaryDto } from './dto/water-summary.dto';
export declare class WaterController {
    private readonly waterService;
    constructor(waterService: WaterService);
    logWaterIntake(logWaterDto: LogWaterDto): Promise<{
        message: string;
    }>;
    getWaterSummary(userId: string): Promise<WaterSummaryDto>;
}
