import { getKeywords } from "../../controllers/keywords.js";

export default async (req, res) => {
  try {
    const { query } = req;

    console.log("query: ", query);
    const result = await getKeywords(query.q);
    console.log("result: ", result);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
};
