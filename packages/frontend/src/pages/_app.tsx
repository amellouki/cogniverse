import 'react-toastify/dist/ReactToastify.css';
import "@/styles/globals.scss";
import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
import { Outfit } from "next/font/google";
import {getGuardedLayout} from "@/components/Layouts/DefaultLayout";
import {ReactElement, ReactNode, useState} from "react";
import {NextPage} from "next";
import {ToastContainer} from "react-toastify";

const outfit = Outfit({ subsets: ['latin'] });

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || getGuardedLayout;
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
        <ToastContainer />
      </>
    </QueryClientProvider>
  );
}
