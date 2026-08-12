import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogService } from './water-log.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';

describe('WaterLogService', () => {
  let service: WaterLogService;
  let prisma: PrismaService;

  const mockPrisma = {
    waterLog: {
      upsert: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaterLogService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<WaterLogService>(WaterLogService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('logWater', () => {
    it('should upsert a water log successfully', async () => {
      const dto = {
        userId: 'user123',
        date: new Date('2025-08-04').toISOString(),
        intakeMl: 500,
      };

      const expected = {
        id: 'log1',
        ...dto,
        date: '2025-08-04',
      };

      mockPrisma.waterLog.upsert.mockResolvedValue(expected);

      const result = await service.logWater(dto);
      expect(result).toEqual(expected);
      expect(mockPrisma.waterLog.upsert).toHaveBeenCalledWith({
        where: {
          userId_date: {
            userId: dto.userId,
            date: '2025-08-04',
          },
        },
        update: { intakeMl: dto.intakeMl },
        create: {
          userId: dto.userId,
          date: '2025-08-04',
          intakeMl: dto.intakeMl,
        },
      });
    });

    it('should throw ConflictException if Prisma throws', async () => {
      const dto = {
        userId: 'user123',
        date: new Date().toISOString(),
        intakeMl: 300,
      };

      mockPrisma.waterLog.upsert.mockRejectedValue(new Error('Conflict'));

      await expect(service.logWater(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('getWeeklySummary', () => {
    it('should return water logs for user', async () => {
      const userId = 'user123';
      const logs = [
        { id: 'log1', userId, date: '2025-08-01', intakeMl: 500 },
        { id: 'log2', userId, date: '2025-08-02', intakeMl: 600 },
      ];

      mockPrisma.waterLog.findMany.mockResolvedValue(logs);

      const result = await service.getWeeklySummary(userId);
      expect(result).toEqual(logs);
      expect(mockPrisma.waterLog.findMany).toHaveBeenCalledWith({
        where: { userId },
      });
    });
  });
});
