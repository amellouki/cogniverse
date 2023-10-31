import React, {FunctionComponent} from 'react';
import {NewBot} from "@my-monorepo/shared";
import BotDetails from "@/components/BotForms/ReviewBotDetails/BotDetails";
import FormCTAs from "@/components/BotForms/FormCTAs";
import styles from "./styles.module.scss"


type Props = {
  data: NewBot
  onBack: () => void
  onNext: () => void
  loading?: boolean
}

const ReviewBotDetails: FunctionComponent<Props> = ({
  data,
  ...ctas
                                                    }) => {
  return (
    <div className={styles.ReviewBotDetails}>
      <BotDetails data={data} />
      <FormCTAs
        {...ctas}
        forwardLabel={'Submit'}
      />
    </div>
  );
}

export default ReviewBotDetails;
