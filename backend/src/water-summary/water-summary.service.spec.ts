import { Test, TestingModule } from '@nestjs/testing';
import { WaterSummaryService } from './water-summary.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('WaterSummaryService', () => {
  let service: WaterSummaryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaterSummaryService,
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WaterSummaryService>(WaterSummaryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return formatted water summary', async () => {
    const userId = 'test-user-id';

    const mockQueryResult = [
      {
        date: '2025-08-01',
        totalIntake: 1500,
        percentageOfGoal: 75,
      },
      {
        date: '2025-07-31',
        totalIntake: 2000,
        percentageOfGoal: 100,
      },
    ];

    (prismaService.$queryRaw as jest.Mock).mockResolvedValue(mockQueryResult);

    const result = await service.getWaterSummary(userId);

    expect(prismaService.$queryRaw).toHaveBeenCalled();
    expect(result).toEqual([
      {
        date: '2025-08-01',
        totalIntake: 1500,
        percentageOfGoal: 75,
      },
      {
        date: '2025-07-31',
        totalIntake: 2000,
        percentageOfGoal: 100,
      },
    ]);
  });
});
