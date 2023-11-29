import React, {FunctionComponent} from 'react';
import {ArcherContainer, ArcherElement} from "react-archer";
import InfoCard from "@/components/Motivation/InfoCard";
import Logo from "@/components/Logo";
import styles from './styles.module.scss';
import DiscordIcon from "@/components/icons/Discord.icon";
import SlackIcon from "@/components/icons/Slack.icon";

const Motivation: FunctionComponent = () => {
  return (
    <ArcherContainer strokeColor={"var(--primary-foreground)"}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.element}>
            <InfoCard
              status={'inactive'}
              description={'CogniVerse is a platform for building bots and agents that can be integrated with messaging platforms like Discord, Slack, Telegram, etc.'}
              background={"var(--color-2-dim)"}
            >
              Build bots and agents
            </InfoCard>
          </div>
          {/*Instructions*/}
          <ArcherElement
            id="instructions"
            relations={[
              {
                targetId: 'cogniverse',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                className: styles.relation
              },
            ]}
          >
            <div className={styles.element}>
              <InfoCard
                description={'Use custom prompts and instructions to dictate how the bot operate and behave'}
              >
                Custom Instructions
              </InfoCard>
            </div>
          </ArcherElement>
          {/*Language models*/}
          <ArcherElement
            id="language-models"
            relations={[
              {
                targetId: 'cogniverse',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                className: styles.relation
              },
            ]}
          >
            <div className={styles.element}>
              <InfoCard
                description={'Choose from a variety of large language models to power your bot'}
              >
                Large language models
              </InfoCard>
            </div>
          </ArcherElement>
          {/*Tools*/}
          <ArcherElement
            id="tools"
            relations={[
              {
                targetId: 'cogniverse',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                className: styles.relation
              },
            ]}
          >
            <div className={styles.element}>
              <InfoCard
                description={'Configure the tools you want to use to power your bot: Browsing, Image generation, UI, etc...'}
              >
                Tools
              </InfoCard>
            </div>
          </ArcherElement>
          {/*Data sources*/}
          <ArcherElement
            id="data-sources"
            relations={[
              {
                targetId: 'cogniverse',
                targetAnchor: 'left',
                sourceAnchor: 'right',
                className: styles.relation
              },
            ]}
          >
            <div className={styles.element}>
              <InfoCard
                placement={"top-start"}
                description={'Point your bot to documents or other data sources for data retrieval'}
              >
                Data sources
              </InfoCard>
            </div>
          </ArcherElement>
        </div>
        {/*CogniVerse*/}
        <ArcherElement
          id="cogniverse"
          relations={[
            {
              targetId: 'discord',
              targetAnchor: 'left',
              sourceAnchor: 'right',
              className: styles.relation
            },
            {
              targetId: 'slack',
              targetAnchor: 'left',
              sourceAnchor: 'right',
              className: styles.relation
            },
            {
              targetId: 'others',
              targetAnchor: 'left',
              sourceAnchor: 'right',
              className: styles.relation
            },
          ]}
        >
          <div className={styles.element}>
            <InfoCard status={'active'}><Logo /></InfoCard>
          </div>
        </ArcherElement>
        <div className={styles.right}>
          {/*integration*/}
          <div className={styles.element}>
            <InfoCard
              status={'inactive'}
              background={"var(--color-3-dim)"}
              description={'Integrate your bot with messaging platforms like Discord, Telegram, Slack, etc.'}
            >
              Integrate with messaging platforms
            </InfoCard>
          </div>
          {/*Discord*/}
          <ArcherElement
            id="discord"
          >
            <div className={styles.element}>
              <InfoCard>
                <DiscordIcon width={"32px"} height={"32px"} /><span>Discord</span>
              </InfoCard>
            </div>
          </ArcherElement>
          {/*Slack*/}
          <ArcherElement
            id="slack"
          >
            <div className={styles.element}>
              <InfoCard>
                <SlackIcon width={"32px"} height={"32px"} /><span>Slack</span>
              </InfoCard>
            </div>
          </ArcherElement>
          {/*Others*/}
          <ArcherElement
            id="others"
          >
            <div className={styles.element}>
              <InfoCard>
                ...
              </InfoCard>
            </div>
          </ArcherElement>
        </div>
      </div>
    </ArcherContainer>
  );
}

export default Motivation;
