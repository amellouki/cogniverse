import Folder from '../Folder';
import File from '../File';

const GoogleDriveItem = ({ data }: { data: any }) => {
  if (data.mimeType === 'application/vnd.google-apps.folder') {
    return <Folder data={data} />;
  }
  return <File data={data} />;
};

export default GoogleDriveItem;
