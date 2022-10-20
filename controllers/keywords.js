import Keyword from "../models/Keywords.js";
import { connectMongoDB, generateMongoId } from "../utils/mongoose.js";

export const getKeywords = async (query) => {
  try {
    await connectMongoDB();
    console.log("getKeywords controller: ", query);

    const regex = `^${query}`;
    const searchResults = await Keyword.find({
      keyword: { $regex: regex, $options: "im" },
    });
    const keywords = searchResults.map((doc) => doc.keyword);
    console.log("keywords found: ", keywords);
    return keywords;
  } catch (err) {
    return err;
  }
};

// HELPER FUNCTIONS

export const formatKeywords = (keywords) => {
  let lowercasedKeywords = keywords.map((keyword) => keyword.toLowerCase());
  return lowercasedKeywords;
};

export const saveKeywords = async (keywords) => {
  // convert all keywords to their lowercase form
  const formattedKeywords = formatKeywords(keywords);

  const results = await Promise.allSettled(
    formattedKeywords.map(async (keyword) => {
      const newKeyword = new Keyword({
        keyword,
      });
      return await newKeyword.save();
    })
  );

  let fulfilled = results.filter((el) => el.status === "fulfilled");
  fulfilled = fulfilled.map((obj) => obj.value.keyword);
  let rejected = results.filter((el) => el.status === "rejected");
  rejected = rejected.map((err) => err.reason.keyValue.keyword);

  return { fulfilled, rejected };
};
