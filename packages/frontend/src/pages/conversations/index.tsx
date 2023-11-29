import Conversation from "@/pages/conversations/[conversationId]";
import React, {useEffect} from "react";
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";

const Conversations: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/conversations/new').then( () =>
      console.log('Redirected to /conversations')
    )
  }, [router])
  return (
    <></>
  );
}

Conversations.getLayout = Conversation.getLayout

export default Conversations;
