import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

// This raw query took nearly an hour to finalize due to issues with the date field.
// The SQLite (file-based) database was storing dates in an unexpected format,
// which caused problems with filtering and grouping by date.
// Solved it by converting the stored UNIX timestamp using SQLite's datetime functions.

@Injectable()
export class WaterSummaryService {
  constructor(private prisma: PrismaService) {}

  async getWaterSummary(userId: string) {
    const result = await this.prisma.$queryRaw<
      Array<{
        date: string;
        totalIntake: number;
        percentageOfGoal: number;
      }>
    >(Prisma.sql`
      SELECT
         DATE(datetime("date" / 1000, 'unixepoch')) AS "date",
        SUM("intakeMl") AS "totalIntake",
        ROUND(SUM("intakeMl") * 100.0 / 2000.0) AS "percentageOfGoal"
      FROM "WaterLog"
      WHERE "userId" = ${userId}
      AND DATE(datetime("date" / 1000, 'unixepoch')) >= DATE('now', '-6 days')
  GROUP BY DATE(datetime("date" / 1000, 'unixepoch'))
  ORDER BY DATE(datetime("date" / 1000, 'unixepoch')) DESC
    `);

    return result.map((row) => ({
      date: row.date,
      totalIntake: Number(row.totalIntake),
      percentageOfGoal: Number(row.percentageOfGoal),
    }));
  }
}
