import mongoose from "mongoose";
import Phrase from "./Phrase.js";
import User from "./User.js";

export const RelationSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    origin: { type: mongoose.SchemaTypes.ObjectId, ref: "Phrase" },
    entry: { type: mongoose.SchemaTypes.ObjectId, ref: "Phrase" },
    likes: { type: [String], default: [] },
    likesCount: { type: Number, min: 0, default: 0 },
    pending: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: `updated_at` } }
);

// When a relation is saved (from its origin), push that relation to the related entry
RelationSchema.pre("save", async function () {
  console.log("in RelationSchema.pre('save')");
  console.log("this: ", this);
  const { entry, creator } = this;
  console.log("entry: ", entry);

  const relatedPhrase = await Phrase.findById(entry).select("creator");
  console.log("relatedPhrase: ", relatedPhrase);

  // if that other entry is the same creator, no issue
  if (creator === relatedPhrase.creator) {
    console.log("creator === relatedPhrase.creator");
    const updatedRelatedPhrase = await Phrase.findByIdAndUpdate(
      entry,
      {
        $push: { relations: this },
      },
      {
        new: true,
      }
    );
    console.log("updatedRelatedPhrase: ", updatedRelatedPhrase);
  } else {
    // push it to that phrase's relations, but set it as "pending"
    this.pending = true;
    console.log("after setting this to pending: ", this);
    const updatedRelatedPhrase = await Phrase.findByIdAndUpdate(
      entry,
      {
        $push: { relations: this },
      },
      {
        new: true,
      }
    );
    console.log("updatedRelatedPhrase: ", updatedRelatedPhrase);
  }

  // but if not, send a notification instead to that owner requesting for a relation, and only when the owner accepts, should it successfully save

  // note: should this be a middleware? or in the controller?
  // or should I add a pending: Boolean field in the Relation schema?

  // doesn't trigger the PhraseSchema.pre("save") middleware, but pushes the relation to both the origin and relatedPhrase
});

RelationSchema.post("save", async function (relation) {
  console.log("in Phrase > .post(save) middleware");
  // update the User's relations, and relations_count properties
  const user = await User.findByIdAndUpdate(
    phrase.creator,
    {
      $push: { relations: relation },
      $inc: { relations_count: 1 },
    },
    { new: true }
  );

  console.log("updated user object: ", user);
});

// when the Relation is deleted, this pulls that relation from it's origin and entry
// btw, before it gets here, there's already been a checkpoint checking that this relation was created by the editor
RelationSchema.post("findOneAndDelete", async function (relation) {
  console.log("in RelationSchema.post('findOneAndDelete)");
  console.log("relation: ", relation);

  // pull that relation from both the origin (if it exists)
  let origin = await Phrase.findById(relation.origin);
  if (origin) {
    const updatedOrigin = await Phrase.findByIdAndUpdate(
      relation.origin,
      {
        $pull: { relations: relation._id },
      },
      {
        select: "title creator relations relation_count",
        new: true,
      }
    );
    console.log("updatedOrigin: ", updatedOrigin);
  }

  // and the entry (if it exists)
  let entry = await Phrase.findById(relation.entry);
  if (entry) {
    const updatedEntry = await Phrase.findByIdAndUpdate(
      relation.entry,
      {
        $pull: { relations: relation._id },
      },
      {
        select: "title creator relations relation_count",
        new: true,
      }
    );
    console.log("updatedEntry: ", updatedEntry);
  }

  console.log("decrementing the relation_count property of the user object");
  const user = await User.findByIdAndUpdate(
    relation.creator,
    {
      $inc: { relations_count: -1 },
    },
    {
      new: true,
    }
  );
  console.log("user: ", user);
});

const Relation =
  mongoose.models.Relation || mongoose.model("Relation", RelationSchema);

export default Relation;
