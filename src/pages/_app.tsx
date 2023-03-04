/* eslint-disable react/no-unescaped-entities */
import type { AppProps } from "next/app";
import Head from "next/head";
import AppProvider from "../utils/appProvider";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/globals.css";

NProgress.configure({
  showSpinner: false,
});
//Route Events.
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <style>
        @import
        url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
      </style>
    </Head>
    <AppProvider {...pageProps}>
      <Component {...pageProps} />
    </AppProvider>
  </>
);

export default MyApp;
