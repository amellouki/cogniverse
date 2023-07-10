import React, {FunctionComponent} from 'react';
import useEmbeddedDocumentsList from "@/hooks/use-embedded-document-list.hook";
import Link from "next/link";

const EmbeddedDocumentsSelector: FunctionComponent = (props) => {
  const { data } = useEmbeddedDocumentsList();
  if (data?.length === 0) return (<div>No documents registered yet!</div>);
  return (
    <div>
      {data?.map((item) => (
        <Link href={item.url} key={item.id}>
          {item.title}({item.size})
        </Link>
      ))}
    </div>
  );
}

export default EmbeddedDocumentsSelector;
