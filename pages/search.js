import styles from "./search.module.css";

const Search = ({ q }) => {
  return <div className={styles.container}>your query string is "{q}"</div>;
};

export function getServerSideProps(ctx) {
  const { query } = ctx;
  console.log("query: ", query);

  return {
    props: { q: query.q },
  };
}

export default Search;
