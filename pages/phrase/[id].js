import { Typography, List, ListItemButton, Grid } from "@mui/material";
import AddEntryDialog from "../../components/AddEntryDialog.js";

import { getPhraseInfo } from "../../controllers/phrases.js";
import PreviewCard from "../../components/Phrase/PreviewCard.js";

import styles from "./styles.module.css";

import Link from "next/link";

const Phrase = (props) => {
  console.log("props: ", props);
  const parsed = JSON.parse(props.data);
  console.log("parsed: ", parsed);

  return (
    <Grid container className={styles.grid}>
      <Grid item xs={12} md={10} lg={8}>
        <PreviewCard data={parsed} />
      </Grid>
    </Grid>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  console.log("in getServerSideProps of phrase/[id]: ");

  const data = await getPhraseInfo(id);

  if (!data) {
    return {
      notFound: true,
    };
  }

  console.log(data.title);
  console.log(data.type);

  return {
    props: { data: JSON.stringify(data) },
  };
}

export default Phrase;
