import mongoose from "mongoose";
import { PhraseSchema } from "./Phrase.js";
import { RelationSchema } from "./Relation.js";

const UserSchema = new mongoose.Schema({
  googleId: String, // create a new User upon successful sign on w/ OAuth
  email: { type: String, required: true },
  username: {
    type: String,
    required: true,
  },
  admin: { type: Boolean, default: false },
  password: {
    type: String,
    required: function () {
      // if there is no googleId, return true
      // if there is a googleId passed in, return false
      return !this.googleId;
    },
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: String,
  phrases: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Phrase" }],
    default: [],
  },
  relations: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Relation" }],
    default: [],
  },
});

UserSchema.pre("save", async () => {
  console.log("UserSchema.pre: ", this);
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
