/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."Aft" (
    "id" SERIAL NOT NULL,
    "masterId" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Aft_id_key" ON "public"."Aft"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "public"."User"("id");

-- AddForeignKey
ALTER TABLE "public"."Aft" ADD CONSTRAINT "Aft_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
