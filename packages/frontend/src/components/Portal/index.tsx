import React, {FunctionComponent, PropsWithChildren} from 'react';
import {createPortal} from "react-dom";
import {useMounted} from "@/hooks/use-mounted.hook";

const Portal: FunctionComponent<PropsWithChildren & { target: string }> = ({children, target}) => {
  const mounted = useMounted();

  return mounted ? createPortal(children, document.getElementById(target)!) : null

}

export default Portal;
