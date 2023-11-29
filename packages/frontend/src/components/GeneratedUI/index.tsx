import React, {FunctionComponent, useContext} from 'react';
import styles from './styles.module.scss';
import Button from "@/components/Button";
import {SendMessageContext} from "@/pages/conversations/[conversationId]";

type Props = {
  data: {
    ui_type: 'button_group' | 'modal' | string;
    payload: {
      options: {
        text: string;
        value: string;
      }[];
    }
  }
}

const GeneratedUI: FunctionComponent<Props> = ({
  data
                                               }) => {

  const sendMessage = useContext(SendMessageContext)
  return (
    <section className={styles.GeneratedUI}>
      {data.payload.options.map((option, index) => {
        return (
          <Button key={option.value} onClick={() => {
            sendMessage(option.value)
          }}>
            {option.text}
          </Button>
        )
      })}
    </section>
  );
}

export default GeneratedUI;
