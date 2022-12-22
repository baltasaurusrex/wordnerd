import "../styles/globals.css";
import Layout from "../components/Layout.js";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider, useSnackbar } from "notistack";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <SessionProvider session={session}>
        <SnackbarProvider maxStack={3}>
          <Layout>{page}</Layout>
        </SnackbarProvider>
      </SessionProvider>
    ));

  return getLayout(
    <SessionProvider session={session}>
      <SnackbarProvider maxStack={3}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </SessionProvider>
  );
}

export default MyApp;
