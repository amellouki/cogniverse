import React, {FunctionComponent, useState} from 'react';
import {useRouter} from "next/router";
import {useBotDetails} from "@/hooks/use-bot-details";
import {Bot, BotAvatarType, BotType, ConversationalBot, NewBot, RcBot} from "@my-monorepo/shared";
import RetrievalConversational from "@/components/BotForms/RetrievalConversational";
import Conversational from "@/components/BotForms/Conversational";
import {InputType as ConversationalInputType} from "@/components/BotForms/Conversational/form.schema";
import {InputType as RCInputType} from "@/components/BotForms/RetrievalConversational/form.schema";
import {NextPageWithLayout} from "@/pages/_app";
import BotsPage from "@/pages/bots/index";
import useUpdateBot from "@/hooks/use-update-bot.hook";

const BotDetails: NextPageWithLayout = () => {
  const router = useRouter()
  const botId = parseInt(router.query.botId as string)
  const {data} = useBotDetails(botId)
  const [updating, setUpdating] = useState(false)

  const mutation = useUpdateBot(() => {
    console.log('updated successfully!')
  })

  if (!data) return (<div>Loading...</div>)
  return (
    <>
      <button onClick={() => setUpdating(true)}>Update</button>
      {!updating && (
        <div>
          {data?.name}
          {data?.description}
          {data?.configuration.type}
        </div>
      )}
      {updating && (renderForm(data, (updatedValues) => {
        mutation.mutate({
          id: data.id,
          creatorId: data.creatorId,
          ...updatedValues
        })
        console.log(data)
        setUpdating(false)
      }))}
    </>
  );
}

function getBotAvatarColor(data: Bot): string {
  const avatar = data.configuration.avatar;

  if (avatar.type === BotAvatarType.BOT_AVATAR_EMOTE) {
    return avatar.backgroundColor;
  }
  throw new Error('Not implemented');
}

function getAllowedDiscordChannelId(data: Bot): string | undefined {
  const discordIntegration = data.configuration.thirdPartyIntegration?.discord;
  if (!discordIntegration) return undefined;
  if (discordIntegration.isPrivate && discordIntegration.allowedChannels.length > 0) {
    return discordIntegration.allowedChannels[0]
  }
  throw new Error('Not implemented');
}

function getRCFromValue(data: RcBot): RCInputType {
  return {
    name: data.name,
    isRLMCustomPrompt: !!data.configuration.retrievalLm?.prompt,
    rlmPrompt: data.configuration.retrievalLm?.prompt,
    isCLMCustomPrompt: !!data.configuration.conversationalLm?.prompt,
    clmPrompt: data.configuration.conversationalLm?.prompt,
    color: getBotAvatarColor(data),
    isBoundToDocument: !!data.boundDocument,
    boundDocumentId: data.boundDocumentId ?? undefined,
    isPublic: data.public,
    integrateWithDiscord: !!data.configuration?.thirdPartyIntegration?.discord,
    discordChannelId: getAllowedDiscordChannelId(data),
  }
}

function getConversationalFormValue(data: ConversationalBot): ConversationalInputType {
  return {
    name: data.name,
    isCustomPrompt: !!data.configuration.lm?.prompt,
    prompt: data.configuration.lm?.prompt,
    color: getBotAvatarColor(data),
    isPublic: data.public,
    integrateWithDiscord: !!data.configuration?.thirdPartyIntegration?.discord,
    discordChannelId: getAllowedDiscordChannelId(data),
  }
}

function renderForm(data: Bot, onSubmit: (data: NewBot) => void) {
  switch (data.type) {
    case BotType.RETRIEVAL_CONVERSATIONAL:
      return <RetrievalConversational initValue={getRCFromValue(data)} onSubmit={onSubmit} />
    case BotType.CONVERSATIONAL:
      return <Conversational initValue={getConversationalFormValue(data)} onSubmit={onSubmit} />
    default:
      return <div>Unknown</div>
  }
}

BotDetails.getLayout = BotsPage.getLayout;

export default BotDetails;
