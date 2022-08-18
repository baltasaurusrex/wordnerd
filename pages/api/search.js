import { searchPhrases } from "../../controllers/phrases.js";

export default async (req, res) => {
  try {
    const { query } = req;

    const result = await searchPhrases(query.q);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
};
