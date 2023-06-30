import "@/styles/globals.scss";
import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
import { Outfit } from "next/font/google";
import Layout from "@/components/Layout";
import styles from "@/pages/styles.module.scss";

const outfit = Outfit({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <style jsx global>{`
          html {
            font-family: ${outfit.style.fontFamily};
          }
        `}</style>
        <Layout className={styles.chat} mainContentClassName={styles.mainContentClassName}>
          <Component {...pageProps} />
        </Layout>
      </>
    </QueryClientProvider>
  );
}
