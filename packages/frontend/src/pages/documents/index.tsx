import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/components/Layouts/DefaultLayout/BotNestedLayout";
import useEmbeddedDocumentsList from "@/hooks/use-embedded-document-list.hook";
import Docs from "@/components/Docs";

const BotsPage: NextPageWithLayout = () => {
  const { data, isLoading } = useEmbeddedDocumentsList();
  if (isLoading) return (<div>Loading...</div>)
  if (!data) return (<div>No Docs</div>)
  return (
    <Docs docs={data} />
  );
}

BotsPage.getLayout = getLayout;

export default BotsPage;
