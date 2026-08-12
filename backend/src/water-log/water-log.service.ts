// src/water-log/water-log.service.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SummaryResponseDTO } from './dto/water-log';


@Injectable()
export class WaterLogService {
    constructor(private prisma: PrismaService ) {
  
     }
    //Add water log , also don't need to restrict as its going to upsert
    async upsertWaterLog(userId: string, date: string, intakeMl: number) {
        try {
            return await this.prisma.waterLog.upsert({
                where: {
                    userId_date: {
                        userId,
                        date: date,
                    },
                },
                update: {
                    intakeMl,
                },
                create: {
                    userId,
                    date: date,
                    intakeMl,
                },
            });
        } catch (error) {
            console.error('Error upserting water log:', error);
            throw new InternalServerErrorException('Failed to upsert water log');
        }
    }
    //get Water Summary using Rawquery

 async getWaterSummary(userId: string): Promise<SummaryResponseDTO[]> {
    const result = await this.prisma.$queryRaw<Array<{
      date: string;
      totalIntake: number;
    }>>`
      SELECT 
        date,
        intakeMl as totalIntake
      FROM WaterLog 
      WHERE userId = ${userId}
        AND date >= date('now', '-6 days')
        AND date <= date('now')
      ORDER BY date ASC
    `;

    // Fill in missing dates with 0 intake
    const summary: SummaryResponseDTO[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const existingLog = result.find(log => log.date === dateStr);
      const totalIntake = existingLog ? existingLog.totalIntake : 0;
      const percentageOfGoal = Math.round((totalIntake / 2000) * 100);

      summary.push({
        date: dateStr,
        totalIntake,
        percentageOfGoal,
      });
    }

    return summary;
  }

}
