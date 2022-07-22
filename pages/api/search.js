import Fuse from "fuse.js";
import { connectMongoDB } from "../../utils/mongoose.js";
import Phrase from "../../models/Phrase.js";

export default async (req, res) => {
  try {
    const { query } = req;

    await connectMongoDB();

    const phrases = await Phrase.find({});

    const options = {
      includeScore: true,
      keys: ["title"],
    };

    const fuse = new Fuse(phrases, options);
    let result = fuse.search(query.q);
    result = result.slice(0, 5);
    result = result.map(({ item }) => ({ title: item.title, id: item._id }));

    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
