import { useContext } from 'react';
import SelectionArea, { SelectionEvent } from '@viselect/react';
import styles from '@/pages/data/google-drive/styles.module.scss';
import { SelectedFiles } from '@/pages/data/google-drive/[id]';
import GoogleDriveItem from '@/pages/data/google-drive/components/GoogleDriveItem';

const GoogleDriveNavigation = ({ items }: { items: any[] }) => {
  const extractIds = (els: Element[]): string[] =>
    els
      .map((v) => v.getAttribute('data-key'))
      .filter(Boolean)
      .map(String);

  const [selected, setSelected] = useContext(SelectedFiles);

  console.log(selected);
  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id: string) => next.add(id));
      extractIds(removed).forEach((id: string) => next.delete(id));
      return next;
    });
  };

  return (
    <SelectionArea
      className={styles.container}
      onStart={onStart}
      onMove={onMove}
      selectables={'.' + styles.Selectable}
    >
      <ul className={styles.Selection}>
        {items?.map((file: any) => (
          <GoogleDriveItem key={file.id} data={file} />
        ))}
      </ul>
    </SelectionArea>
  );
};

export default GoogleDriveNavigation;
