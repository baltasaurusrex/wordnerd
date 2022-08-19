import React from "react";
import { Paper } from "@mui/material";
import styles from "./SearchResult.module.css";
import Link from "next/link";

function SearchResult({ data }) {
  return (
    <Paper className={styles.container} elevation={1}>
      <Link href={`/phrase/${encodeURIComponent(data.id)}`}>{data.title}</Link>
    </Paper>
  );
}

export default SearchResult;
