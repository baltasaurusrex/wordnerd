import mongoose from "mongoose";

const KeywordSchema = mongoose.Schema({
  keyword: { type: String, required: true, unique: true },
});

// create a middleware that always saves new keywords as lowercase
// create a middleware that detects duplicate keywords and prevents them from being saved

const Keyword =
  mongoose.models.Keyword || mongoose.model("Keyword", KeywordSchema);
export default Keyword;
