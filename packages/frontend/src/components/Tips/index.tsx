import React, {FunctionComponent} from 'react';
import Link from "next/link";

const Tips: FunctionComponent = () => {
  return (
    <div className={'prose-xl prose-a:underline hover:prose-a:opacity-50 overflow-auto h-full'} style={{textAlign: "left"}}>
      <h1>How to start 🚀?</h1>
      <h2>1. <Link href={'/embed-document'}>Embed your document</Link></h2>
      <p>
        Select a PDF document to embed and configure the block size and overlap parameters.
      </p>
      <h2>2. <Link href={'/conversation/create'}>Create a new retrieval conversation</Link></h2>
      <p>
        Customise the pre-prompt as you like (or use the default setting) and select your <strong>embedded document</strong> - which the LLM will use to retrieve knowledge from it.
      </p>
      <h2>3. Start your new conversation</h2>
      <p>
        Your created conversation will be added to your sidebar, click it and start querying your conversational-retrieval agent.
      </p>
    </div>
  );
}

export default Tips;
