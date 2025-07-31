import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { WaterService } from './water.service';

describe('WaterService', () => {
  let service: WaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterService, PrismaService],
    }).compile();

    service = module.get<WaterService>(WaterService);
  });

  it('should log water intake and return the log', async () => {
    const dto = { userId: 'test-user', date: '2025-07-30', intakeMl: 750 };
    const result = await service.logWater(dto);

    expect(result).toHaveProperty('userId', dto.userId);
    expect(result).toHaveProperty('intakeMl', dto.intakeMl);
  });

  it('should return summary data', async () => {
    const summary = await service.getWeeklySummary('test-user');
    expect(Array.isArray(summary)).toBe(true);
  });
});
