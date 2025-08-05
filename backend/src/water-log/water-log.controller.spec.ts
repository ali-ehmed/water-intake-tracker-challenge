import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogController } from './water-log.controller';
import { WaterLogService } from './water-log.service';

describe('WaterLogController', () => {
  let controller: WaterLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterLogController],
      providers: [
        {
          provide: WaterLogService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WaterLogController>(WaterLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
