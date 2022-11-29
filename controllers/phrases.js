import Phrase from "../models/Phrase.js";
import Fuse from "fuse.js";
import { connectMongoDB, generateMongoId } from "../utils/mongoose.js";
import { createRelationsFromNewEntry, deleteRelation } from "./relations.js";
import { saveAuthor } from "./authors.js";
import { saveKeywords } from "./keywords.js";

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

    var originId = await generateMongoId();
    console.log("originId", originId);

    // ObjectId "_id" gets added here
    let phrase = {
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
    };

    phrase = await createRelationsFromNewEntry(phrase);
    console.log("phrase after relations: ", phrase);

    let phraseToSave = new Phrase({ ...phrase });

    const newPhrase = await phraseToSave.save();

    console.log("newPhrase: ", newPhrase);

    if (phrase.author.length > 0) {
      const savedAuthor = await saveAuthor(phrase.author);
    }

    if (phrase.keywords) {
      const keywordsSaved = await saveKeywords(keywords);
    }

    return newPhrase;
  } catch (err) {
    throw err;
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

export async function searchPhrases(query) {
  try {
    console.log("searchPhrases controller: ", query);
    await connectMongoDB();

    const phrases = await Phrase.find({}).select("title _id type");

    console.log("length: ", phrases.length);

    const options = {
      includeScore: true,
      keys: ["title"],
      useExtendedSearch: true,
      threshold: 0.3,
      shouldSort: true,
    };

    const fuse = new Fuse(phrases, options);
    let result = fuse.search(query);
    result = result.slice(0, 5);
    console.log("result: ", result);
    result = result.map(({ item }) => ({
      title: item.title,
      id: item._id,
      type: item.type,
    }));

    return result;
  } catch (err) {
    return err;
  }
}

export async function deletePhrase(id) {
  try {
    await connectMongoDB();
    // find phrase by id
    let phrase = await Phrase.findById(id);
    if (!phrase) {
      throw { errCode: 404, message: "Phrase doesn't exist." };
    }
    // if phrase exists, delete it, as well as all its accompanying relations
    // deleteRelations
    if (phrase.relations.length > 0) {
      const deleted_relations = await Promise.all(
        phrase.relations.map((relation) => deleteRelation(relation))
      );

      console.log("deleted_relations: ", deleted_relations);
    }

    // deletePhrase
    return Phrase.findByIdAndDelete(phrase._id);
  } catch (err) {
    throw err;
  }
}
