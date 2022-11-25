import React from "react";
import { Paper, Grid } from "@mui/material";
import cn from "classnames";

import styles from "./PhraseCard.module.css";

const PhraseCard = ({ phrase }) => {
  return (
    <div className={styles.card}>
      <Paper className={styles.paper}>
        <Grid container className={styles.grid} wrap="nowrap">
          <Grid item>
            <p
              className={cn(
                styles.title,
                {
                  [styles.word]: phrase.type === "word",
                },
                {
                  [styles.idiom]: phrase.type === "idiom",
                },
                {
                  [styles.proverb]: phrase.type === "proverb",
                },
                {
                  [styles.sentence_long]: phrase.type === "quote",
                }
              )}
            >
              {phrase.title}
            </p>
          </Grid>
          <Grid item style={{ alignSelf: "start", paddingTop: "1em" }}>
            <Paper component="span" className={styles.type}>
              {phrase.type}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PhraseCard;
