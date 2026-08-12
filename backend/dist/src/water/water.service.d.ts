import { CreateWaterLogDto } from './dto/create-water-log.dto';
import { PrismaService } from '../../prisma/prisma.service';
export declare class WaterService {
    private prisma;
    constructor(prisma: PrismaService);
    upsertWaterLog(data: CreateWaterLogDto): Promise<{
        id: string;
        userId: string;
        date: number;
        intakeMl: number;
    }>;
    getWaterSummary(userId: string): Promise<{
        date: string;
        totalIntake: number;
        percentageOfGoal: number;
    }[]>;
}
