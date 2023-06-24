import React, {FunctionComponent} from 'react';
import {useQuery} from "react-query";
import {ConversationItem as Conversation} from "@/types/ChatThread";
import ConversationItem from "@/components/ConversationsList/ConversationItem";

const ConversationsList: FunctionComponent = (props) => {
  const {data} = useQuery<Conversation[]>("conversations", () => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/api/conversations").then((res) => res.json());
  });
  return (
    <div>
      {data && data.map((conversation) => {
        return <ConversationItem key={conversation.id} conversation={conversation} />
      })}
    </div>
  );
}

export default ConversationsList;
