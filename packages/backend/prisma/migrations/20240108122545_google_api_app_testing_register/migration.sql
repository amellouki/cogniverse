-- AlterEnum
ALTER TYPE "OAuthProvider" ADD VALUE 'GOOGLE';

-- CreateTable
CREATE TABLE "OAuth" (
    "id" SERIAL NOT NULL,
    "provider" "OAuthProvider" NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "extra" JSONB,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestGoogleDrive" (
    "email" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TestGoogleDrive_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_provider_providerAccountId_key" ON "OAuth"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
