import "../styles/globals.css";
import Layout from "../components/Layout.js";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { ProSidebarProvider } from "react-pro-sidebar";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <SessionProvider session={session}>
        <ProSidebarProvider>
          <SnackbarProvider maxStack={3}>
            <Layout>{page}</Layout>
          </SnackbarProvider>
        </ProSidebarProvider>
      </SessionProvider>
    ));

  return getLayout(
    <SessionProvider session={session}>
      <ProSidebarProvider>
        <SnackbarProvider maxStack={3}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ProSidebarProvider>
    </SessionProvider>
  );
}

export default MyApp;
