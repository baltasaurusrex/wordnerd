import mongoose from "mongoose";

// const PhraseSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     type: { type: String, enum: ["word", "idiom", "proverb", "quote"] },
//     author: { type: String, default: "" },
//     description: { type: String, default: "" },
//     keywords: { type: [String], default: [] },
//     relations: {
//       type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Relation" }],
//       default: [],
//     },
//     sampleSentences: { type: [String], default: [] },
//     creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
//     likes: { type: [String], default: [] },
//     likesCount: { type: Number, min: 0 },
//   },
//   { timestamps: { createdAt: "created_at", updatedAt: `updated_at` } }
// );
const PhraseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
});

const Phrase = mongoose.model("Phrase", PhraseSchema);

export default Phrase;
