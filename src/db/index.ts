import mongoose, { set } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  set('strictQuery', true)
  if (!process.env.DATABASE_URL) return console.log("Missing MongoDB URL");

  try {
    const db = await mongoose.connect(process.env.DATABASE_URL);

    isConnected = true;

    return db;
  } catch (error: any) {
    console.log("🚀 ~ connectToDB ~ error:", error.message);
  }
};
