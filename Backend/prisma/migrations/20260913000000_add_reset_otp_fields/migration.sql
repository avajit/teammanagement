-- AlterTable
ALTER TABLE "User" ADD COLUMN "resetOtp" TEXT;
ALTER TABLE "User" ADD COLUMN "resetOtpExpiry" TIMESTAMP(3);
