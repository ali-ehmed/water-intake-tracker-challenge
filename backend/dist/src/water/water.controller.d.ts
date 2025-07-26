import { WaterService } from './water.service';
import { CreateWaterLogDto } from './dto/create-water-log.dto';
export declare class WaterController {
    private readonly waterService;
    constructor(waterService: WaterService);
    createLog(dto: CreateWaterLogDto): Promise<{
        id: string;
        userId: string;
        date: number;
        intakeMl: number;
    }>;
    getSummary(userId: string): Promise<{
        date: string;
        totalIntake: number;
        percentageOfGoal: number;
    }[]>;
}
