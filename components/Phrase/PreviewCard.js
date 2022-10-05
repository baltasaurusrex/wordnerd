import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
} from "@mui/material";

import Link from "next/link";

import "animate.css";

import styles from "./PreviewCard.module.css";

function PreviewCard({ data }) {
  console.log(data);
  return (
    <Paper elevation={1} className={styles.preview_card}>
      <Grid
        container
        style={{ justifyContent: "space-between", alignItems: "center" }}
        wrap="nowrap"
      >
        <Grid item className="animate__animated animate__fadeIn">
          <Typography style={{ marginRight: "1rem" }} variant="h5">
            {data.title}
          </Typography>
        </Grid>

        <Grid item className="animate__animated animate__fadeIn">
          <Paper component="span" style={{ padding: "0.5rem" }}>
            {data.type}
          </Paper>
        </Grid>
      </Grid>

      <Grid
        style={{ margin: "1rem 0" }}
        className="animate__animated animate__fadeIn"
      >
        <Typography>{data.description}</Typography>
      </Grid>
      {data.sampleSentences?.length > 0 && (
        <Grid
          style={{ margin: "1rem 0" }}
          className="animate__animated animate__fadeIn"
        >
          {data.sampleSentences?.map((sentence, i) => (
            <Typography
              key={i}
              variant="subtitle1"
              style={{ fontStyle: "italic", paddingLeft: "1rem" }}
            >
              &#x2022; "{sentence}"
            </Typography>
          ))}
        </Grid>
      )}

      {data.keywords?.length > 0 && (
        <Grid
          className={`${styles.keywords_grid} animate__animated animate__fadeIn`}
        >
          {data.keywords?.map((keyword, i) => (
            <Paper key={i} component="span">
              {keyword}
            </Paper>
          ))}
        </Grid>
      )}
      {data.relations?.length > 0 && (
        <>
          <Divider className={`animate__animated animate__fadeIn`}>
            <Chip label="Related entries: " />
          </Divider>
          <Grid
            className={`${styles.keywords_grid} animate__animated animate__fadeIn`}
          >
            {data.relations?.map((relation, i) => {
              let entry =
                relation.entry._id !== data._id
                  ? relation.entry
                  : relation.origin;
              return (
                <Link href={`/phrase/${encodeURIComponent(entry._id)}`} key={i}>
                  <Paper style={{ cursor: "pointer" }} key={i} component="span">
                    {entry.title}
                  </Paper>
                </Link>
              );
            })}
          </Grid>
        </>
      )}
    </Paper>
  );
}

export default PreviewCard;
