/*
  Warnings:

  - A unique constraint covering the columns `[studentId,electiveId]` on the table `Preference` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,rank]` on the table `Preference` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Preference_studentId_electiveId_key" ON "Preference"("studentId", "electiveId");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_studentId_rank_key" ON "Preference"("studentId", "rank");
