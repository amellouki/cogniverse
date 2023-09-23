import Conversation from '@/pages/conversations/[conversationId]'
import React, {useEffect} from "react";
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/conversations').then( () =>
      console.log('Redirected to /conversations')
    )
  }, [router])

  return (
    <></>
  );
}

Home.getLayout = Conversation.getLayout

export default Home;
