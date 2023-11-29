import React, {FunctionComponent, PropsWithChildren} from 'react';
import useOverlay from "@/components/BaseFormFields/Select/use-overlay.hook";
import Portal from "@/components/Portal";
import {Placement} from "@popperjs/core/lib/enums";
import styles from '@/components/Motivation/InfoCard/styles.module.scss';
import clsx from "clsx";

type Props = {
  description?: string
  placement?: Placement
  status?: 'active' | 'inactive'
  background?: string
}

const InfoCard: FunctionComponent<PropsWithChildren<Props>> = ({
                                                                 description,
                                                                 placement,
                                                                 children,
                                                                 status,
  background
                                                               }) => {
  const [hovered, setHovered] = React.useState(false)

  const {
    setReferenceElement,
    setPopperElement,
    attributes,
    popperStyles
  } = useOverlay(placement);

  return (
    <div
      ref={setReferenceElement}
      className={clsx(styles.InfoCard, status === 'active' && styles.alwaysActive, status === 'inactive' && styles.alwaysInactive)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{background}}
    >
      <span className={styles.idea}>{children}</span>
      {description && <Portal target={'select-overlay'}>
          <div
              ref={setPopperElement}
              className={styles.description}
              style={
                {
                  ...popperStyles.popper,
                  display: hovered ? 'block' : 'none',
                  opacity: hovered ? 1 : 0
                }
              }
              {...attributes.popper}
          >
            {description}
          </div>
      </Portal>
      }
    </div>
  );
}

export default InfoCard;
