import Phrase from "../models/Phrase.js";
import Relation from "../models/Relation.js";
import { connectMongoDB } from "../utils/mongoose.js";

export async function getPhraseInfo(id) {
  try {
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

export async function getRelations(id) {}
