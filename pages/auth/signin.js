import React from "react";
import Head from "next/head";

import { Paper } from "@mui/material";

import styles from "./signin.module.css";

const SignIn = () => {
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
          <h1 className={styles.logo}>WordNerd</h1>
        </Paper>
      </div>
    </>
  );
};

SignIn.getLayout = (page) => page;

export default SignIn;
