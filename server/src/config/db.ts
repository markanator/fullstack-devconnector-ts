import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/**
 * This function attempts to connect to a mongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectDB;
