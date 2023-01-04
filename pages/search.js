import Head from "next/head";
import styles from "./search.module.css";
import { searchPhrases } from "../controllers/phrases.js";
import SearchResult from "../components/SearchResult.js";
import { Typography } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout.js";
import SearchLayout from "../components/Layouts/SearchLayout.js";

const Search = ({ q, JSONresults }) => {
  console.log("results: ", JSON.parse(JSONresults));
  const results = JSON.parse(JSONresults);

  let mappedResults = results.map((result, i) => (
    <SearchResult key={i} data={result} />
  ));

  return (
    <>
      <Head>
        <title>WordNerd Beta</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/wn_logo_transparent.png" />
      </Head>
      <div className={styles.container}>
        <Typography className={styles.header} variant="caption">
          {mappedResults.length}{" "}
          {mappedResults.length > 1 ? `results` : `result`} for: "{q}"
        </Typography>
        <div>{mappedResults}</div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  console.log("query: ", query);

  // get results from query
  const results = await searchPhrases(query.q);

  console.log("results: ", results);
  // if no results
  // if results

  return {
    props: { q: query.q, JSONresults: JSON.stringify(results) },
  };
}

Search.getLayout = (page) => (
  <SessionProvider>
    <Layout>
      <SearchLayout>{page}</SearchLayout>
    </Layout>
  </SessionProvider>
);

export default Search;
