-- CreateTable
CREATE TABLE "SlackConversation" (
    "id" TEXT NOT NULL,

    CONSTRAINT "SlackConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlackMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "slackConversationId" TEXT,
    "isBot" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "botId" INTEGER,

    CONSTRAINT "SlackMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SlackConversation_id_idx" ON "SlackConversation"("id");

-- CreateIndex
CREATE INDEX "SlackMessage_id_slackConversationId_idx" ON "SlackMessage"("id", "slackConversationId");

-- AddForeignKey
ALTER TABLE "SlackMessage" ADD CONSTRAINT "SlackMessage_slackConversationId_fkey" FOREIGN KEY ("slackConversationId") REFERENCES "SlackConversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlackMessage" ADD CONSTRAINT "SlackMessage_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
