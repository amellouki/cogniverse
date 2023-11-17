import React, {useState} from 'react';
import {useRouter} from "next/router";
import {useBotDetails} from "@/hooks/bot-mangement/use-bot-details";
import {
  Bot,
  BotAvatarType,
  BotType,
  ConversationalBot,
  NewBot,
  RcBot,
  SomethingWentWrongException
} from "@my-monorepo/shared";
import {InputType as ConversationalInputType} from "@/components/BotForms/form-wizards/ConversationalSteps/form.schema";
import {InputType as RCInputType} from "@/components/BotForms/form-wizards/RCSteps/form.schema";
import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/components/Layouts/DefaultLayout/CreateBotNestedLayout";
import useUpdateBot from "@/hooks/bot-mangement/use-update-bot.hook";
import useDeleteBot from "@/hooks/bot-mangement/use-delete-bot.hook";
import Button from "@/components/Button";
import {TrashIcon} from "@heroicons/react/24/outline";
import {Planet} from "react-kawaii";
import DetailsItem from "@/components/DetailsItem";
import styles from './styles.module.scss'
import ConversationalSteps from "@/components/BotForms/form-wizards/ConversationalSteps";
import RCSteps from "@/components/BotForms/form-wizards/RCSteps";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const BotDetails: NextPageWithLayout = () => {
  const router = useRouter()
  const botId = parseInt(router.query.botId as string)
  const {data} = useBotDetails(botId)
  const [updating, setUpdating] = useState(false)

  const updateBot = useUpdateBot(botId,() => {
    console.log('Updated successfully!')
    setUpdating(false)
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
        {
          renderForm(
            data,
            updateBot.status === 'loading',
            (updatedValues) => {
              updateBot.mutate({
                id: data.id,
                ...updatedValues
              })
            }
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
  throw new SomethingWentWrongException('Not implemented');
}

function getAllowedDiscordChannelId(data: Bot): string[] | undefined {
  const discordIntegration = data.configuration.thirdPartyIntegration?.discord;
  if (!discordIntegration) return undefined;
  if (discordIntegration.isPrivate && discordIntegration.allowedChannels) {
    return discordIntegration.allowedChannels
  }
  throw new SomethingWentWrongException('Not implemented');
}

function getRCFromValue(data: RcBot): RCInputType {
  return {
    botInfo: {
      color: getBotAvatarColor(data),
      name: data.name,
      description: data.description ?? undefined,
      isPublic: data.public,
      isBoundToDocument: !!data.boundDocument,
      boundDocumentId: data.boundDocumentId ?? undefined,
    },
    botConfig: {
      isRLMCustomPrompt: !!data.configuration.retrievalLm?.prompt,
      rlmPrompt: data.configuration.retrievalLm?.prompt,
      rLlm: data.configuration.retrievalLm?.modelName!,
      rApiKey: data.configuration.retrievalLm?.apiKey!,
      isCLMCustomPrompt: !!data.configuration.conversationalLm?.prompt,
      clmPrompt: data.configuration.conversationalLm?.prompt,
      cLlm: data.configuration.conversationalLm?.modelName!,
      cApiKey: data.configuration.conversationalLm?.apiKey!,
    },
    integration: {
      integrateWithDiscord: !!data.configuration?.thirdPartyIntegration?.discord,
      discordChannelIds: getAllowedDiscordChannelId(data),
      integrateWithSlack: !!data.configuration?.thirdPartyIntegration?.slack,
      slackChannelIds: data.configuration?.thirdPartyIntegration?.slack?.allowedChannels ?? undefined,
    }
  }
}

function getConversationalFormValue(data: ConversationalBot): ConversationalInputType {
  return {
    botInfo: {
      color: getBotAvatarColor(data),
      name: data.name,
      description: data.description ?? undefined,
      isPublic: data.public,
    },
    botConfig: {
      isCustomPrompt: !!data.configuration.lm?.prompt,
      prompt: data.configuration.lm?.prompt,
      apiKey: data.configuration.lm?.apiKey!,
      llm: data.configuration.lm?.modelName!,
    },
    integration: {
      integrateWithDiscord: !!data.configuration?.thirdPartyIntegration?.discord,
      discordChannelIds: getAllowedDiscordChannelId(data),
      integrateWithSlack: !!data.configuration?.thirdPartyIntegration?.slack,
      slackChannelIds: data.configuration?.thirdPartyIntegration?.slack?.allowedChannels ?? undefined
    }
  }
}

function renderForm(data: Bot, loading: boolean, onSubmit: (data: NewBot) => void) {
  switch (data.type) {
    case BotType.RETRIEVAL_CONVERSATIONAL:
      return <RCSteps
        update={true}
        loading={loading}
        input={getRCFromValue(data)}
        onSubmit={onSubmit}
      />
    case BotType.CONVERSATIONAL:
      return <ConversationalSteps
        update={true}
        loading={loading}
        input={getConversationalFormValue(data)}
        onSubmit={onSubmit}
      />
    default:
      return <div>Unknown</div>
  }
}

BotDetails.getLayout = getLayout

export default BotDetails;
