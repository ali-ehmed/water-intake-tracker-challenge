import { Test, TestingModule } from '@nestjs/testing';
import { WaterSummaryController } from './water-summary.controller';
import { WaterSummaryService } from './water-summary.service';

describe('WaterSummaryController', () => {
  let controller: WaterSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterSummaryController],
      providers: [
        {
          provide: WaterSummaryService,
          useValue: {
            getSummary: jest.fn().mockResolvedValue({}), // mock method
          },
        },
      ],
    }).compile();

    controller = module.get<WaterSummaryController>(WaterSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
