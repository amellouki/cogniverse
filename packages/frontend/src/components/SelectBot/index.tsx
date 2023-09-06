// TODO: Component can be simplified
import React, {FunctionComponent, useEffect, useMemo} from 'react';
import {useQuery} from "react-query";
import {Bot, BotType} from "@my-monorepo/shared";
import useEmbeddedDocumentsList from "@/hooks/use-embedded-document-list.hook";
import {Controller, useForm} from "react-hook-form";
import {DocumentMetadata} from "@my-monorepo/shared";
import {Select} from "@/components/BaseFormFields/Select";
import SelectOption from "@/types/SelectOption";
import styles from './styles.module.scss'
import apiInstance from "@/helpers/api";

export type BotSelection = {
  botId: number;
  documentId?: number;
}

export type SelectionRef = {
  bot: Bot;
  document?: DocumentMetadata;
}

type Props = {
  botSelectionRef: React.MutableRefObject<SelectionRef | undefined>;
}

const SelectBot: FunctionComponent<Props> = ({ botSelectionRef }) => {
  const {data: botsData} = useQuery<Bot[]>('bots', () => {
    return apiInstance.get('/bot/get-bots').then((res) => res.data)
  });
  const botsOptions = useMemo(() => {
    return botsData?.map((bot) => ({
      label: bot.name,
      value: bot.id + ''
    })) ?? [];
  }, [botsData]);

  const botsMap = useMemo(() => {
    return new Map(botsData?.map(option => [option.id, option]))
  }, [botsData])

  const {data: documentsData} = useEmbeddedDocumentsList();

  const documentsOptions = useMemo(() => {
    return documentsData?.map((document) => ({
      label: document.title,
      value: document.id + ''
    })) ?? [];
  }, [documentsData]);

  const documentsMap = useMemo(() => {
    return new Map(documentsData?.map(option => [option.id, option]))
  }, [documentsData])

  const {control, watch, formState: { errors }} = useForm<BotSelection>({ mode: 'onChange' })
  const watchAllFields = watch();
  const selectedBot = botsMap.get(watchAllFields.botId)
  useEffect(() => {
    const selectedBot = botsMap.get(watchAllFields.botId)
    if (!selectedBot) {
      return;
    }
    const selectedDocument =
      (selectedBot.type === BotType.RETRIEVAL_CONVERSATIONAL && watchAllFields.documentId)
        ? documentsMap.get(watchAllFields.documentId)
        : undefined;
    if (!selectedDocument && selectedBot.type === BotType.RETRIEVAL_CONVERSATIONAL) {
      return; // TODO: show error
    }
    botSelectionRef.current = {
      bot: selectedBot,
      document: selectedDocument
    }
  }, [botSelectionRef, watchAllFields, errors]);

  return (
    <div className={styles.SelectBot}>
      <Controller
        render={({field: {onChange, value}}) => (
          <Select
            id={'bot'}
            className={styles.select}
            options={botsOptions}
            onChange={(selected) => selected && onChange(parseInt(selected.value))}
            selected={botToSelected(value, botsMap)}
            placeholder={'Select bot'}
          />
        )}
        name={'botId'}
        control={control}
      />
      {selectedBot?.type === BotType.RETRIEVAL_CONVERSATIONAL &&
        <Controller
          render={({field: {onChange, value}}) => (
            <Select
              id={'document'}
              className={styles.select}
              options={documentsOptions}
              onChange={(selected) => selected && onChange(parseInt(selected.value))}
              selected={documentToSelected(value, documentsMap)}
              placeholder={'Select document'}
            />
          )}
          name={'documentId'}
          control={control}
        />
      }
    </div>
  );
}

function botToSelected(id: number | undefined, optionsMap: Map<number, Bot>): SelectOption | undefined {
  if (!id) {
    return undefined;
  }
  const bot = optionsMap.get(id);
  return bot ? {
    label: bot.name,
    value: bot.id + ''
  } : undefined;
}

function documentToSelected(id: number | undefined, optionsMap: Map<number, DocumentMetadata>): SelectOption | undefined {
  if (!id) {
    return undefined;
  }
  const document = optionsMap.get(id);
  return document ? {
    label: document.title,
    value: document.id + ''
  } : undefined;
}

export default SelectBot;
