import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogService } from './water-log.service';
import { PrismaService } from './prisma.service';

// Mock PrismaService
const mockPrisma = {
  waterLog: {
    upsert: jest.fn().mockResolvedValue({
      id: 1,
      userId: 'testuser',
      date: '2025-07-17',
      intakeMl: 1000,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  },
};

describe('WaterLogService', () => {
  let service: WaterLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaterLogService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<WaterLogService>(WaterLogService);
  });

  it('should upsert a water log', async () => {
    const result = await service.upsertWaterLog('testuser', '2025-07-17', 1000);
    expect(result).toHaveProperty('userId', 'testuser');
    expect(result).toHaveProperty('intakeMl', 1000);
    expect(mockPrisma.waterLog.upsert).toHaveBeenCalled();
  });
});
