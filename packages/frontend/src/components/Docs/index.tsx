import React, {FunctionComponent} from 'react';
import {DocumentMetadata} from "@my-monorepo/shared";
import DocsGrid from "@/components/Docs/Grid";

type Props = {
  docs: DocumentMetadata[]
}

const Docs: FunctionComponent<Props> = ({
  docs
                                        }) => {
  return (
    <DocsGrid docs={docs} />
  );
}

export default Docs;
