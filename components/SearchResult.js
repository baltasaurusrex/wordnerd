import React from "react";
import { Paper } from "@mui/material";
import styles from "./SearchResult.module.css";
import Link from "next/link";
import PhraseCard from "./homepage/PhraseCard.js";

function SearchResult({ data }) {
  return (
    <div className={styles.container}>
      <Link href={`/phrase/${encodeURIComponent(data.id)}`}>
        <a>
          <PhraseCard phrase={data} />
        </a>
      </Link>
    </div>
  );
}

export default SearchResult;
