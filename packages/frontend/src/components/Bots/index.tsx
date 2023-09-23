import React, {FunctionComponent} from 'react';
import BotsGrid from "@/components/Bots/Grid";
import {Bot} from "@my-monorepo/shared";

type Props = {
  bots: Bot[]
}

const Bots: FunctionComponent<Props> = ({
  bots
                                        }) => {
  return (
    <BotsGrid bots={bots} />
  );
}

export default Bots;
