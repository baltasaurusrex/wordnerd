import Author from "../models/Author.js";
import Fuse from "fuse.js";
import { connectMongoDB, generateMongoId } from "../utils/mongoose.js";

export async function saveAuthor(author) {
  try {
    const foundAuthor = await Author.findOne({ author });
    if (foundAuthor) {
      return foundAuthor;
    } else {
      let newAuthor = await new Author({ author });
      newAuthor = await newAuthor.save();
      return newAuthor;
    }
  } catch (err) {
    throw err;
  }
}

export const getAuthors = async (query) => {
  try {
    await connectMongoDB();
    console.log("getAuthors controller: ", query);

    const authors = await Author.find({});
    console.log("length: ", authors.length);

    const options = {
      includeScore: true,
      keys: ["author"],
      useExtendedSearch: true,
      threshold: 0.7,
      shouldSort: true,
    };

    const fuse = new Fuse(authors, options);
    let result = fuse.search(query);
    result = result.slice(0, 5);
    console.log("result: ", result);
    result = result.map(({ item }) => item.author);

    return result;
  } catch (err) {
    return err;
  }
};
