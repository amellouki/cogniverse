import { FunctionComponent, PropsWithChildren, useContext } from 'react';
import clsx from 'clsx';
import styles from '@/pages/data/google-drive/styles.module.scss';
import { SelectedFiles } from '@/pages/data/google-drive/[id]';

type Props = {
  children: any;
  id: string;
  className?: string;
};

const Selectable: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  id,
  className,
}) => {
  const [selected] = useContext(SelectedFiles);
  return (
    <li
      className={clsx(
        styles.Selectable,
        selected.has(id) && styles.selected,
        className,
      )}
      data-key={id}
    >
      {children}
    </li>
  );
};

export default Selectable;
