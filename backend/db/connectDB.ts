import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    console.log("mongo-uri: ", process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to MongoDB: ", (error as Error).message);
    process.exit(1);
  }
};
