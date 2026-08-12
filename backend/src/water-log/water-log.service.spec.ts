import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogService } from './water-log.service';
import { PrismaService } from '../prisma/prisma.service';

describe('WaterLogService', () => {
  let service: WaterLogService;

  const mockPrismaService = {
    waterLog: {
      upsert: jest.fn(),
    },
    $queryRaw: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaterLogService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<WaterLogService>(WaterLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upsertWaterLog', () => {
    it('should create a new water log entry', async () => {
      const mockWaterLog = {
        id: '1',
        userId: 'user1',
        date: '2023-12-01',
        intakeMl: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.waterLog.upsert.mockResolvedValue(mockWaterLog);

      const result = await service.upsertWaterLog({
        userId: 'user1',
        date: '2023-12-01',
        intakeMl: 500,
      });

      expect(result).toEqual(mockWaterLog);
      expect(mockPrismaService.waterLog.upsert).toHaveBeenCalledWith({
        where: {
          userId_date: {
            userId: 'user1',
            date: '2023-12-01',
          },
        },
        update: {
          intakeMl: 500,
        },
        create: {
          userId: 'user1',
          date: '2023-12-01',
          intakeMl: 500,
        },
      });
    });
  });

  describe('getWaterSummary', () => {
    it('should return water summary for the last 7 days', async () => {
      const mockRawResult = [
        { date: '2023-12-01', totalIntake: 1500, percentageOfGoal: 75.0 },
        { date: '2023-12-02', totalIntake: 2000, percentageOfGoal: 100.0 },
      ];

      mockPrismaService.$queryRaw.mockResolvedValue(mockRawResult);

      const result = await service.getWaterSummary('user1');

      expect(result).toEqual({
        data: [
          { date: '2023-12-01', totalIntake: 1500, percentageOfGoal: 75.0 },
          { date: '2023-12-02', totalIntake: 2000, percentageOfGoal: 100.0 },
        ],
      });
    });
  });
});
