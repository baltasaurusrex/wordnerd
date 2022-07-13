import Phrase from "../models/Phrase.js";
import { connectMongoDB } from "../utils/mongoose.js";

export async function getPhraseInfo(id) {
  try {
    await connectMongoDB();
    const phrase = await Phrase.findById(id).lean();
    return phrase;
  } catch (err) {
    return err;
  }
}
