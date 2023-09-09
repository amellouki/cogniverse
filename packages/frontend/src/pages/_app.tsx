import "@/styles/globals.scss";
import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
import { Outfit } from "next/font/google";
import Layout from "@/components/Layout";
import styles from "@/pages/styles.module.scss";
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import RouteGuard from "@/components/RouteGuard";

const outfit = Outfit({ subsets: ['latin'] });

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => (
    <RouteGuard>
      <Layout
        className={styles.chat}
        mainClassName={styles.main}
      >
        {page}
      </Layout>
    </RouteGuard>
  ))
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <style jsx global>{`
          html {
            font-family: ${outfit.style.fontFamily};
          }
        `}</style>
        {getLayout(<Component {...pageProps} />)}
        <div id="select-overlay" />
      </>
    </QueryClientProvider>
  );
}
