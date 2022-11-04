import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema({
  author: { type: String, required: true, unique: true },
});

const Author = mongoose.models.Author || mongoose.model("Author", AuthorSchema);
export default Author;
