import React, {FunctionComponent, useState} from 'react';
import {useRouter} from "next/router";
import {useBotDetails} from "@/hooks/bot-mangement/use-bot-details";
import {Bot, BotAvatarType, BotType, ConversationalBot, NewBot, RcBot} from "@my-monorepo/shared";
import RetrievalConversational from "@/components/BotForms/RetrievalConversational";
import Conversational from "@/components/BotForms/Conversational";
import {InputType as ConversationalInputType} from "@/components/BotForms/Conversational/form.schema";
import {InputType as RCInputType} from "@/components/BotForms/RetrievalConversational/form.schema";
import {NextPageWithLayout} from "@/pages/_app";
import BotsPage from "@/pages/bots/index";
import useUpdateBot from "@/hooks/bot-mangement/use-update-bot.hook";
import useDeleteBot from "@/hooks/bot-mangement/use-delete-bot.hook";
import Button from "@/components/Button";
import {TrashIcon} from "@heroicons/react/24/outline";
import {Planet} from "react-kawaii";
import DetailsItem from "@/components/DetailsItem";
import styles from './styles.module.scss'

const BotDetails: NextPageWithLayout = () => {
  const router = useRouter()
  const botId = parseInt(router.query.botId as string)
  const {data} = useBotDetails(botId)
  const [updating, setUpdating] = useState(false)

  const updateBot = useUpdateBot(() => {
    console.log('Updated successfully!')
  })
  const deleteBot = useDeleteBot(() => {
    console.log('Deleted successfully!')
    router.push('/bots').then(() => {
      console.log('Redirected successfully!')
    })
  })

  if (!data) return (<div>Loading...</div>)
  const avatar = data.configuration.avatar;
  if (updating) {
    return (
      <div className={styles.BotDetailsPage}>
        <h1>Update Bot</h1>
        {
          renderForm(
            data,
            (updatedValues) => {
            updateBot.mutate({
              id: data.id,
              creatorId: data.creatorId,
              ...updatedValues
            })
            console.log(data)
            setUpdating(false)
            },
            () => setUpdating(false)
          )
        }
      </div>
    )
  }
  return (
    <div className={styles.BotDetailsPage}>
      <section className={styles.upperSection}>
        <h1>
          Bot Details
        </h1>
        <div className={styles.actions}>
          <Button onClick={() => setUpdating(true)}>Update</Button>
          <Button onClick={() => deleteBot.mutate(data.id)} variant={'danger'} className={styles.deletionButton}>
            <TrashIcon width={24} height={24} /><span>Delete</span>
          </Button>
        </div>
      </section>
      <section className={styles.detailsSection}>
        <div className={styles.botInfo}>
          <DetailsItem label={'name'} value={data.name} />
          <DetailsItem label={'bot type'} value={data.type} />
          {data.description && (
            <DetailsItem
              label={'Description'}
              valueClassName={styles.ellipsis}
              value={data.description}
            />
          )}
          {data.configuration.type === BotType.CONVERSATIONAL && data.configuration.lm?.prompt && (
            <DetailsItem
            label={'custom prompt'}
            valueClassName={styles.ellipsis}
            value={data.configuration.lm.prompt}
            />
          )}
          {data.configuration.type === BotType.RETRIEVAL_CONVERSATIONAL && data.configuration.retrievalLm?.prompt && (
            <DetailsItem
              label={'custom Retrieval Prompt'}
              valueClassName={styles.ellipsis}
              value={data.configuration.retrievalLm.prompt}
            />
          )}
          {data.configuration.type === BotType.RETRIEVAL_CONVERSATIONAL && data.configuration.conversationalLm?.prompt && (
            <DetailsItem
              label={'custom conversational prompt'}
              valueClassName={styles.ellipsis}
              value={data.configuration.conversationalLm.prompt}
            />
          )}
        </div>
        {avatar.type === BotAvatarType.BOT_AVATAR_EMOTE && <Planet size={100} mood="happy" color={avatar.backgroundColor} />}
      </section>
    </div>
  );
}

function getBotAvatarColor(data: Bot): string {
  const avatar = data.configuration.avatar;

  if (avatar.type === BotAvatarType.BOT_AVATAR_EMOTE) {
    return avatar.backgroundColor;
  }
  throw new Error('Not implemented');
}

function getAllowedDiscordChannelId(data: Bot): string[] | undefined {
  const discordIntegration = data.configuration.thirdPartyIntegration?.discord;
  if (!discordIntegration) return undefined;
  if (discordIntegration.isPrivate && discordIntegration.allowedChannels) {
    return discordIntegration.allowedChannels
  }
  throw new Error('Not implemented');
}

function getRCFromValue(data: RcBot): RCInputType {
  return {
    name: data.name,
    description: data.description ?? undefined,
    isRLMCustomPrompt: !!data.configuration.retrievalLm?.prompt,
    rlmPrompt: data.configuration.retrievalLm?.prompt,
    isCLMCustomPrompt: !!data.configuration.conversationalLm?.prompt,
    clmPrompt: data.configuration.conversationalLm?.prompt,
    color: getBotAvatarColor(data),
    isBoundToDocument: !!data.boundDocument,
    boundDocumentId: data.boundDocumentId ?? undefined,
    isPublic: data.public,
    integrateWithDiscord: !!data.configuration?.thirdPartyIntegration?.discord,
    discordChannelIds: getAllowedDiscordChannelId(data),
  }
}

function getConversationalFormValue(data: ConversationalBot): ConversationalInputType {
  return {
    name: data.name,
    description: data.description ?? undefined,
    isCustomPrompt: !!data.configuration.lm?.prompt,
    prompt: data.configuration.lm?.prompt,
    color: getBotAvatarColor(data),
    isPublic: data.public,
    integrateWithDiscord: !!data.configuration?.thirdPartyIntegration?.discord,
    discordChannelIds: getAllowedDiscordChannelId(data),
  }
}

function renderForm(data: Bot, onSubmit: (data: NewBot) => void, onCancel: () => void) {
  switch (data.type) {
    case BotType.RETRIEVAL_CONVERSATIONAL:
      return <RetrievalConversational initValue={getRCFromValue(data)} onSubmit={onSubmit} onCancel={onCancel} />
    case BotType.CONVERSATIONAL:
      return <Conversational initValue={getConversationalFormValue(data)} onSubmit={onSubmit} onCancel={onCancel} />
    default:
      return <div>Unknown</div>
  }
}

BotDetails.getLayout = BotsPage.getLayout;

export default BotDetails;
