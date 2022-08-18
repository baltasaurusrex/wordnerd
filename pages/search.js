import styles from "./search.module.css";
import { searchPhrases } from "../controllers/phrases.js";

const Search = ({ q, results }) => {
  console.log("results: ", JSON.parse(results));

  if (results.length > 0) {
  }
  return (
    <div className={styles.container}>
      your query string is: "{q}"{JSON.stringify(results)}
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
    props: { q: query.q, results: JSON.stringify(results) },
  };
}

export default Search;
