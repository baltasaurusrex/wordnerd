import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getProviders, signIn, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

import { Paper, Button } from "@mui/material";

import styles from "./signin.module.css";

const SignIn = ({ providers }) => {
  const { data: session } = useSession();

  return (
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
            <Button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
      </Paper>
    </div>
  );
};

SignIn.getLayout = (page) => <SessionProvider>{page}</SessionProvider>;

export default SignIn;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
