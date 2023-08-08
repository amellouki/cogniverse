import React, {FunctionComponent, useEffect, useMemo} from 'react';
import {useQuery} from "react-query";
import RcAgent from "../../../../shared/src/types/bot/bot";
import useEmbeddedDocumentsList from "@/hooks/use-embedded-document-list.hook";
import {Controller, useForm} from "react-hook-form";
import {DocumentMetadata} from "@my-monorepo/shared";
import {Select} from "@/components/BaseFormFields/Select";
import SelectOption from "@/types/SelectOption";
import styles from './styles.module.scss'

export type BotSelection = {
  agentId: number;
  documentId?: number;
}

type Props = {
  botSelectionRef: React.MutableRefObject<BotSelection | undefined>;
}

const SelectBot: FunctionComponent<Props> = ({ botSelectionRef }) => {
  const {data: agentsData} = useQuery<RcAgent[]>('agents', () => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/bot/get-bots').then((res) => res.json())
  });

  const agentsOptions = useMemo(() => {
    console.log(agentsData)
    return agentsData?.map((agent) => ({
      label: agent.name,
      value: agent.id + ''
    })) ?? [];
  }, [agentsData]);

  const agentsMap = useMemo(() => {
    return new Map(agentsData?.map(option => [option.id, option]))
  }, [agentsData])

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
  useEffect(() => {
    botSelectionRef.current = watchAllFields;
  }, [botSelectionRef, watchAllFields, errors]);

  return (
    <div className={styles.SelectBot}>
      <Controller
        render={({field: {onChange, value}}) => (
          <Select
            id={'agent'}
            className={styles.select}
            options={agentsOptions}
            onChange={(selected) => selected && onChange(parseInt(selected.value))}
            selected={agentToSelected(value, agentsMap)}
          />
        )}
        name={'agentId'}
        control={control}
      />
      <Controller
        render={({field: {onChange, value}}) => (
          <Select
            id={'document'}
            className={styles.select}
            options={documentsOptions}
            onChange={(selected) => selected && onChange(parseInt(selected.value))}
            selected={documentToSelected(value, documentsMap)}
          />
        )}
        name={'documentId'}
        control={control}
      />
    </div>
  );
}

function agentToSelected(id: number | undefined, optionsMap: Map<number, RcAgent>): SelectOption | undefined {
  if (!id) {
    return undefined;
  }
  const agent = optionsMap.get(id);
  return agent ? {
    label: agent.name,
    value: agent.id + ''
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
