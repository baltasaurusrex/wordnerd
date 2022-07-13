import { getPhraseInfo } from "../../controllers/phrases.js";

const Phrase = (props) => {
  console.log(props);
  return (
    <>
      <div>Title: {props.title}</div>
      <div>Type: {props.type}</div>
      <div>Description: {props.description}</div>
    </>
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
