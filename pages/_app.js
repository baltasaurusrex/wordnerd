import "../styles/globals.css";
import Layout from "../components/Layout.js";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider, useSnackbar } from "notistack";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SnackbarProvider maxStack={3}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </SessionProvider>
  );
}

export default MyApp;
