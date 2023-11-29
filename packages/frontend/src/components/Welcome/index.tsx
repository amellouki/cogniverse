import React, {FunctionComponent} from 'react';

const Welcome: FunctionComponent = () => {
  return (
    <div className={'prose-xl prose-h1:mb-1 prose-h1:font-bold prose-a:underline hover:prose-a:opacity-50 mb-10 mt-10'} style={{textAlign: "left",}}>
      <h1>Welcome to <a href={"https://www.cogniverse.ai/"}>cogniverse.ai</a></h1>
      <p>
        Cogniverse is an <a href={"https://github.com/amellouki/cogniverse"}>open source</a> platform that allows you to build and integrate LLM powered bots to messaging platforms like Discord, Slack etc.
      </p>
    </div>
  );
}

export default Welcome;
