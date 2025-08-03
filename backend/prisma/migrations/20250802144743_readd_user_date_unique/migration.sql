/*
  Warnings:

  - You are about to alter the column `userId` on the `WaterLog` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WaterLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "intakeMl" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_WaterLog" ("createdAt", "date", "id", "intakeMl", "updatedAt", "userId") SELECT "createdAt", "date", "id", "intakeMl", "updatedAt", "userId" FROM "WaterLog";
DROP TABLE "WaterLog";
ALTER TABLE "new_WaterLog" RENAME TO "WaterLog";
CREATE UNIQUE INDEX "WaterLog_userId_date_key" ON "WaterLog"("userId", "date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
