import mongoose from "mongoose";

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
  phrases_count: {
    type: Number,
    default: 0,
    min: 0,
  },
  relations_count: {
    type: Number,
    default: 0,
    min: 0,
  },
});

UserSchema.pre("save", async () => {
  console.log("UserSchema.pre: ", this);
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
