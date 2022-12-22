import User from "../models/User.js";
import { connectMongoDB } from "../utils/mongoose.js";
import _ from "lodash";

export const getUserDetails = async (user) => {
  console.log("in getUserDetails controller: ", user);
  try {
    await connectMongoDB();

    let foundUser = await User.findOne({
      $or: [{ username: user }, { email: user }],
    }).select(`-password`);

    if (foundUser) {
      return foundUser;
    } else {
      return null;
    }
  } catch (err) {
    return err.message;
  }
};

export const createGoogleAccount = async (userObj) => {
  try {
    console.log("in createGoogleAccount: ", userObj);

    const tempUsername = email.match(/^([^@]+)/gi)[0]; // temp username will be the email string (can change this moving forward)
    console.log("tempUsername: ", tempUsername);

    const [firstName, lastName] = userObj.name.split(" ");

    let newUser = new User({
      email,
      username: tempUsername,
      googleId: userObj.id,
      image,
      firstName,
      lastName,
    });

    newUser = await newUser.save();

    let user = _.omit(newUser, ["password"]);

    return user;
  } catch (err) {
    return err.message;
  }
};
