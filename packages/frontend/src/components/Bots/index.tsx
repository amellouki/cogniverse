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
    <div>
      <BotsGrid bots={bots} />
    </div>
  );
}

export default Bots;
