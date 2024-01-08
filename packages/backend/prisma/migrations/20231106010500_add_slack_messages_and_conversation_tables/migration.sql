/*
  Warnings:

  - You are about to drop the `SlackConversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SlackMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SlackMessage" DROP CONSTRAINT "SlackMessage_botId_fkey";

-- DropForeignKey
ALTER TABLE "SlackMessage" DROP CONSTRAINT "SlackMessage_slackConversationId_fkey";

-- DropTable
DROP TABLE "SlackConversation";

-- DropTable
DROP TABLE "SlackMessage";
