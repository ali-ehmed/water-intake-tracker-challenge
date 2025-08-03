import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogService } from './water-log.service';
import { PrismaService } from '../../prisma/prisma.service'; // adjust path as needed

describe('WaterLogService', () => {
  let service: WaterLogService;

  const mockPrismaService = {
    // mock the parts of PrismaService that WaterLogService uses
    waterLog: {
      findMany: jest.fn(),
      create: jest.fn(),
      // ...add others as needed
    },
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
});
