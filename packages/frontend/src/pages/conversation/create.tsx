import React, {FunctionComponent} from 'react';
import Layout from "@/components/Layout";
import CreateConversation from "@/components/CreateConversation";

const Create: FunctionComponent = (props) => {
  return (
    <Layout>
      <CreateConversation />
    </Layout>
  );
}

export default Create;
