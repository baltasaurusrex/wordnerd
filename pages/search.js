import styles from "./search.module.css";
import { searchPhrases } from "../controllers/phrases.js";
import SearchResult from "../components/SearchResult.js";

const Search = ({ q, JSONresults }) => {
  console.log("results: ", JSON.parse(JSONresults));
  const results = JSON.parse(JSONresults);

  let mappedResults = results.map((result, i) => (
    <SearchResult key={i} data={result} />
  ));

  return (
    <div className={styles.container}>
      <div style={{ margin: "0 1rem" }}>Search results for: "{q}"</div>
      <div>{mappedResults}</div>
    </div>
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

export default Search;
