import Conversation from "@/pages/conversations/[conversationId]";
import React from "react";
import {NextPageWithLayout} from "@/pages/_app";

const Conversations: NextPageWithLayout = () => {
  return (
    <Conversation/>
  );
}

Conversations.getLayout = Conversation.getLayout

export default Conversations;
