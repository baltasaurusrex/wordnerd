import Link from "next/link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getPhraseInfo } from "../../controllers/phrases.js";
import styles from "./styles.module.css";

const Phrase = (props) => {
  console.log(props);
  return (
    <div className={styles.container}>
      <Typography variant="h3" component="h1">
        {props.title}
      </Typography>
      <Typography variant="subtitle1">{props.type}</Typography>
      <Typography variant="body1">{props.description}</Typography>

      <Link href="/">
        <Button>Go back to home</Button>
      </Link>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;

  const data = await getPhraseInfo(id);

  if (!data) {
    return {
      notFound: true,
    };
  }

  console.log(data.title);
  console.log(data.type);

  return {
    props: {
      title: data.title,
      type: data.type,
      description: data.description,
    },
  };
}

export default Phrase;
