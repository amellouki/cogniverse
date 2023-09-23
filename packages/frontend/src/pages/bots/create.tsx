import React, {FunctionComponent} from 'react';
import CreateBot from "../../components/CreateBot";
import styles from './styles.module.scss'
import {NextPageWithLayout} from "@/pages/_app";
import BotsPage from "@/pages/bots/index";

const Create: NextPageWithLayout = () => {
  return <CreateBot />;
}

Create.getLayout = BotsPage.getLayout;

export default Create;
