import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddEntryDialog from "../../components/AddEntryDialog.js";

import { getPhraseInfo } from "../../controllers/phrases.js";

import styles from "./styles.module.css";

import Link from "next/link";

const Phrase = (props) => {
  console.log("props: ", props);
  const parsed = JSON.parse(props.data);
  console.log("parsed: ", parsed);
  console.log("parsed.relations: ", parsed.relations);

  const relations = parsed.relations.map((rel, i) => {
    console.log("rel: ", rel);
    const { origin, entry: related } = rel;
    const entry = parsed._id === origin._id ? related : origin;

    return (
      <Link href={`/phrase/${encodeURIComponent(entry._id)}`} key={i}>
        <ListItemButton key={i}>
          <i>{entry.title}</i>
        </ListItemButton>
      </Link>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.entry}>
        <Typography variant="h3" component="h1">
          {parsed.title}
        </Typography>
        <Typography variant="subtitle1">{parsed.type}</Typography>
        <Typography variant="body1">{parsed.description}</Typography>
      </div>
      <div className={styles.relations}>
        <List>{relations}</List>
        <AddEntryDialog />
      </div>
    </div>
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
