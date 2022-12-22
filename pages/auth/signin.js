import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getProviders, signIn, useSession } from "next-auth/react";

import { Paper } from "@mui/material";

import styles from "./signin.module.css";

const SignIn = ({ providers }) => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Rubik+Distressed&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.wrapper}>
        <Paper className={styles.paper}>
          {session && (
            <p>You are already logged in! Redirecting you to the main site.</p>
          )}
          <Link href="/" passHref>
            <a>
              <h1 className={styles.logo}>WordNerd</h1>
            </a>
          </Link>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </Paper>
      </div>
    </>
  );
};

SignIn.getLayout = (page) => page;

export default SignIn;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
