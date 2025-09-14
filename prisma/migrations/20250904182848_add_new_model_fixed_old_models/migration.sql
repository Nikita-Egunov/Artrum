/*
  Warnings:

  - You are about to drop the column `cost` on the `Aft` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Aft" DROP COLUMN "cost";

-- CreateTable
CREATE TABLE "public"."Request" (
    "id" SERIAL NOT NULL,
    "aftId" INTEGER NOT NULL,
    "fromId" INTEGER NOT NULL,
    "awaitsApprove" BOOLEAN NOT NULL DEFAULT true,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_id_key" ON "public"."Request"("id");
