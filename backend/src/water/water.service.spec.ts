import { Test, TestingModule } from '@nestjs/testing';
import { WaterService } from './water.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('WaterService', () => {
  let service: WaterService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterService, PrismaService],
    }).compile();

    service = module.get<WaterService>(WaterService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getWaterSummary', () => {
    it('should return 7-day water summary correctly', async () => {
      // Mock data Prisma will return
      const mockQueryResult = [
        {
          date: '2025-07-24',
          totalIntake: 1800,
          percentageOfGoal: 90,
        },
        {
          date: '2025-07-26',
          totalIntake: 1800,
          percentageOfGoal: 90,
        },
      ];

      // Mock the $queryRaw method
      prisma.$queryRaw = jest.fn().mockResolvedValue(mockQueryResult);

      const userId = 'test-user';
      const result = await service.getWaterSummary(userId);
      
      console.log({result, mockQueryResult})

      expect(prisma.$queryRaw).toHaveBeenCalled();
      expect(result).toEqual(mockQueryResult);
    });
  });
});
