import Phrase from "../models/Phrase.js";
import Fuse from "fuse.js";
import { connectMongoDB, generateMongoId } from "../utils/mongoose.js";

export async function createPhrase(data) {
  try {
    console.log("createPhrase controller: ", data);
    await connectMongoDB();

    let {
      title,
      type,
      author,
      description,
      keywords = [],
      sampleSentences = [],
      relations = [], // will be an array of { _id: ObjectId, title: String }
      creator = data.userId, //string of userId
      likes = [],
    } = data;

    console.log("data.body: ", data.body);

    var originId = await generateMongoId();
    console.log("originId", originId);

    // ObjectId "_id" gets added here
    const phrase = new Phrase({
      _id: originId,
      title,
      type,
      author,
      description,
      keywords,
      sampleSentences,
      relations,
      creator,
      likes,
    });

    const newPhrase = await phrase.save();

    const keywordsSaved = await saveKeywords(keywords);

    res.status(200).json(newPhrase);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export async function searchPhrases(query) {
  try {
    console.log("searchPhrases controller: ", query);
    await connectMongoDB();

    const phrases = await Phrase.find({}).select("title _id");

    const options = {
      includeScore: true,
      keys: ["title"],
      useExtendedSearch: true,
      threshold: 0.3,
      shouldSort: true,
    };

    const fuse = new Fuse(phrases, options);
    let result = fuse.search(query.q);
    result = result.slice(0, 5);
    console.log("result: ", result);
    result = result.map(({ item }) => ({ title: item.title, id: item._id }));

    return result;
  } catch (err) {
    return err;
  }
}

export async function getPhraseInfo(id) {
  try {
    console.log("getPhraseInfo: ", id);
    await connectMongoDB();
    const phrase = await Phrase.findById(id)
      .populate({
        path: "relations",
        populate: {
          path: "origin entry",
        },
      })
      .lean();
    return phrase;
  } catch (err) {
    return err;
  }
}
