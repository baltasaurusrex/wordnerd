import { getAuthors } from "../../controllers/authors.js";

export default async (req, res) => {
  try {
    const { query } = req;

    console.log("query: ", query);
    const result = await getAuthors(query.q);
    console.log("result: ", result);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
};
