import mongoose from "mongoose";
import Relation from "./Relation.js";
import User from "./User.js";

export const PhraseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["word", "idiom", "proverb", "quote"] },
    author: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: { type: [String], default: [] },
    relations: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Relation" }],
      default: [],
    },
    sampleSentences: { type: [String], default: [] },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    likes: { type: [String], default: [] },
    likesCount: { type: Number, min: 0 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: `updated_at` } }
);

// creating "Relations" to those related entries (if any)
// PhraseSchema.pre("save", async function () {
//   console.log("in PhraseSchema.pre('save')");
//   console.log("this, beg: ", this);
//   let { _id, relations, creator } = this;

//   console.log("relations.length > 0 ", relations.length > 0);
//   if (relations.length > 0) {
//     // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
//     console.log("mapping through the relations array,");
//     console.log("creating actual relations for each related object,");
//     console.log("and returning the newly created relations");
//     // for each entry in the relation array

//     console.log("this.relations, beg: ", this.relations);
//     this.relations = await Promise.all(
//       relations.map(async (entry) => {
//         console.log("entry: ", entry);
//         let relation = new Relation({
//           origin: _id,
//           entry: entry._id,
//           creator,
//           likes: [creator],
//         });
//         relation = await relation.save();
//         console.log("returning newly saved relation", relation);
//         return relation;
//       })
//     );
//     console.log("this.relations, end: ", this.relations);
//     console.log("this, end: ", this);
//   }
// });

PhraseSchema.post("save", async function (phrase) {
  console.log("in Phrase > .post(save) middleware");

  // update the User's phrases, and phrase_count properties
  const user = await User.findByIdAndUpdate(
    phrase.creator,
    {
      $push: { phrases: phrase },
      $inc: { phrases_count: 1 },
    },
    { new: true }
  );

  console.log("updated user object: ", user);
});

PhraseSchema.post("findOneAndDelete", async function (deletedPhrase) {
  console.log("in Phrase > .post(findOneAndDelete) middleware");

  // update the User's phrases, and phrase_count properties
  const user = await User.findByIdAndUpdate(
    deletedPhrase.creator,
    {
      $pull: { phrases: deletedPhrase },
      $inc: { phrases_count: -1 },
    },
    { new: true }
  );

  console.log("updated user object: ", user);

  // get the deleted phrase's relations
  // const { relations } = deletedPhrase;
  // console.log("relations: ", relations);
  // // loop through each Relation
  // relations.forEach(async (relation) => {
  //   console.log("relation: ", relation);
  //   const { creator } = await Relation.findById(relation);
  //   console.log("creator: ", creator);
  //   // delete that relation outright if it's creator is the same as the deleted phrase's creator
  //   if (JSON.stringify(deletedPhrase.creator) === JSON.stringify(creator)) {
  //     console.log(`relations creator === deletePhrase's creator`);
  //     await Relation.findByIdAndDelete(relation);
  //   } else {
  //   }
  // });

  // if not, send a delete notification, but still continue with delete
});

const Phrase = mongoose.models.Phrase || mongoose.model("Phrase", PhraseSchema);

export default Phrase;
