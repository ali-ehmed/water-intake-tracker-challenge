/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `WaterLog` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WaterLog_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "WaterLog_userId_date_key" ON "WaterLog"("userId", "date");
