import Keyword from "../models/Keywords.js";

export const getKeywords = async (req, res) => {
  try {
    const { keyword } = req.query;
    console.log("keyword: ", keyword);
    const regex = `^${keyword}`;
    const searchResults = await Keyword.find({
      keyword: { $regex: regex, $options: "im" },
    });
    const keywords = searchResults.map((doc) => doc.keyword);
    console.log("keywords found: ", keywords);
    res.status(200).json(keywords);
  } catch (err) {
    res.status(400).send(err.message);
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

const tester = async () => {
  const result = await saveKeywords(["greatness"]);

  console.log("result: ", result);
};
