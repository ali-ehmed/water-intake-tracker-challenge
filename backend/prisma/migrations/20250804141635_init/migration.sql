/*
  Warnings:

  - The primary key for the `WaterLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `WaterLog` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `WaterLog` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `WaterLog` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WaterLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "intakeMl" INTEGER NOT NULL
);
INSERT INTO "new_WaterLog" ("date", "id", "intakeMl", "userId") SELECT "date", "id", "intakeMl", "userId" FROM "WaterLog";
DROP TABLE "WaterLog";
ALTER TABLE "new_WaterLog" RENAME TO "WaterLog";
CREATE UNIQUE INDEX "WaterLog_userId_date_key" ON "WaterLog"("userId", "date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
