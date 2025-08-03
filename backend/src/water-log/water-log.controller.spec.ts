import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogController } from './water-log.controller';
import { WaterLogService } from './water-log.service';
import { CreateWaterLogDto } from './dto/create-water-log.dto';
import { WaterLogsInterface } from './interfaces/water-log-interface';

describe('WaterLogController', () => {
  let controller: WaterLogController;
  let service: WaterLogService;

  const mockWaterLogService = {
    upsertWaterLog: jest.fn(),
    getAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterLogController],
      providers: [
        {
          provide: WaterLogService,
          useValue: mockWaterLogService,
        },
      ],
    }).compile();

    controller = module.get<WaterLogController>(WaterLogController);
    service = module.get<WaterLogService>(WaterLogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('upsertWaterLog', () => {
    it('should call service.upsertWaterLog and return result', async () => {
      const dto: CreateWaterLogDto = {
        userId: 'user123',
        date: '08/02/2025',
        intakeMl: 500,
      };

      const result = { ...dto };
      mockWaterLogService.upsertWaterLog.mockResolvedValue(result);

      expect(await controller.upsertWaterLog(dto)).toEqual(result);
      expect(mockWaterLogService.upsertWaterLog).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAll', () => {
    it('should return an array of water logs', async () => {
      const result: WaterLogsInterface[] = [
        {
          id: 1,
          userId: 'user123',
          date: new Date('08/02/2025'),
          intakeMl: 500,
          createdAt: new Date('08/02/2025T00:00:00Z'),
          updatedAt: new Date('08/02/2025T00:00:00Z'),
        },
      ];

      mockWaterLogService.getAll.mockResolvedValue(result);

      expect(await controller.getAll()).toEqual(result);
      expect(mockWaterLogService.getAll).toHaveBeenCalled();
    });
  });
});
