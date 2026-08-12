import { Test, TestingModule } from '@nestjs/testing';
import { WaterService } from '../water.service';
import { PrismaClient } from '@prisma/client';

describe('WaterService', () => {
  let service: WaterService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterService],
    }).compile();

    service = module.get<WaterService>(WaterService);
    prisma = new PrismaClient();
  });

  afterEach(async () => {
    // Clean up test data
    await prisma.waterLog.deleteMany({
      where: {
        userId: 'test-user',
      },
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log water intake successfully', async () => {
    const waterLogDto = {
      userId: 'test-user',
      date: '2024-01-01',
      intakeMl: 1500,
    };

    const result = await service.logWaterIntake(waterLogDto);

    expect(result).toBeDefined();
    expect(result.userId).toBe(waterLogDto.userId);
    expect(result.date).toBe(waterLogDto.date);
    expect(result.intakeMl).toBe(waterLogDto.intakeMl);
  });

  it('should update existing water log for same user and date', async () => {
    const waterLogDto = {
      userId: 'test-user',
      date: '2024-01-01',
      intakeMl: 1500,
    };

    // First log
    await service.logWaterIntake(waterLogDto);

    // Update the same log
    const updatedDto = { ...waterLogDto, intakeMl: 2000 };
    const result = await service.logWaterIntake(updatedDto);

    expect(result.intakeMl).toBe(2000);
  });
}); 