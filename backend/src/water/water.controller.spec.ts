import { Test, TestingModule } from '@nestjs/testing';
import { WaterController } from './water.controller';
import { WaterService } from './water.service';

describe('WaterController', () => {
  let controller: WaterController;
  let service: WaterService;
  let user = 'test-user'

  const mockWaterService = {
    getWaterSummary: jest.fn().mockResolvedValue([
      {
        date: '2025-07-24',
        totalIntake: 1800,
        percentageOfGoal: 90,
      },
    ]),
    upsertWaterLog: jest.fn().mockResolvedValue({
      userId: user,
      date: 1721779200,
      intakeMl: 1800,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterController],
      providers: [
        {
          provide: WaterService,
          useValue: mockWaterService,
        },
      ],
    }).compile();

    controller = module.get<WaterController>(WaterController);
    service = module.get<WaterService>(WaterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return water summary', async () => {
    const result = await controller.getSummary(user);
    expect(result).toEqual([
      {
        date: '2025-07-24',
        totalIntake: 1800,
        percentageOfGoal: 90,
      },
    ]);
    expect(service.getWaterSummary).toHaveBeenCalledWith(user);
  });
});
