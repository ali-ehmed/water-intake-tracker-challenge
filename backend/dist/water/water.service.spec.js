"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const water_service_1 = require("./water.service");
const prisma_service_1 = require("../prisma/prisma.service");
describe('WaterService', () => {
    let service;
    let prismaService;
    const mockPrismaService = {
        waterLog: {
            upsert: jest.fn(),
        },
        $queryRaw: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                water_service_1.WaterService,
                {
                    provide: prisma_service_1.PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();
        service = module.get(water_service_1.WaterService);
        prismaService = module.get(prisma_service_1.PrismaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('logWaterIntake', () => {
        it('should upsert water intake for a user and date', async () => {
            const logWaterDto = {
                userId: 'user123',
                date: '2024-01-15',
                intakeMl: 1500,
            };
            mockPrismaService.waterLog.upsert.mockResolvedValue(undefined);
            await service.logWaterIntake(logWaterDto);
            expect(mockPrismaService.waterLog.upsert).toHaveBeenCalledWith({
                where: {
                    userId_date: {
                        userId: 'user123',
                        date: '2024-01-15',
                    },
                },
                update: {
                    intakeMl: 1500,
                },
                create: {
                    userId: 'user123',
                    date: '2024-01-15',
                    intakeMl: 1500,
                },
            });
        });
    });
    describe('getWaterSummary', () => {
        it('should return water summary for the last 7 days', async () => {
            const userId = 'user123';
            const mockRawResult = [
                { date: '2024-01-09', totalIntake: 0 },
                { date: '2024-01-10', totalIntake: 1500 },
                { date: '2024-01-11', totalIntake: 2000 },
                { date: '2024-01-12', totalIntake: 1800 },
                { date: '2024-01-13', totalIntake: 0 },
                { date: '2024-01-14', totalIntake: 2200 },
                { date: '2024-01-15', totalIntake: 1600 },
            ];
            mockPrismaService.$queryRaw.mockResolvedValue(mockRawResult);
            const result = await service.getWaterSummary(userId);
            expect(result).toEqual({
                userId: 'user123',
                summary: [
                    { date: '2024-01-09', totalIntake: 0, percentageOfGoal: 0 },
                    { date: '2024-01-10', totalIntake: 1500, percentageOfGoal: 75 },
                    { date: '2024-01-11', totalIntake: 2000, percentageOfGoal: 100 },
                    { date: '2024-01-12', totalIntake: 1800, percentageOfGoal: 90 },
                    { date: '2024-01-13', totalIntake: 0, percentageOfGoal: 0 },
                    { date: '2024-01-14', totalIntake: 2200, percentageOfGoal: 110 },
                    { date: '2024-01-15', totalIntake: 1600, percentageOfGoal: 80 },
                ],
            });
        });
    });
});
//# sourceMappingURL=water.service.spec.js.map