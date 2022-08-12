import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("now connected to MongoDB");
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function generateMongoId() {
  return new mongoose.Types.ObjectId();
}
