import {useMutation, useQueryClient} from "react-query";
import {NewBot} from "@my-monorepo/shared";
import apiInstance from "@/helpers/api";
// import BotType from "@my-monorepo/shared/dist/types/bot/bot-type";
//
// const CREATE_BOT_ENDPOINTS: Map<BotType, string> = new Map([
//   [BotType.CONVERSATIONAL, '/bots/conversational'],
//   [BotType.RETRIEVAL_CONVERSATIONAL, '/bots/rc'],
// ])

export default function useCreateBot(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  // const endpoint = CREATE_BOT_ENDPOINTS.get(botType)
  // if (!endpoint) {
  //   throw new Error(`Endpoint for bot type ${botType} not found`)
  // }
  return useMutation((newBot: NewBot) => apiInstance.post('/bots', newBot), {
    onSuccess: () => {
      queryClient.invalidateQueries('bots');
      onSuccess?.();
    },
  });
}
