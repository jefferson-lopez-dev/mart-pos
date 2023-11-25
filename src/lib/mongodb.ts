import { connect } from "mongoose";

const { URL_MONGO_DB_ATLAS } = process.env;
if (!URL_MONGO_DB_ATLAS) throw new Error("DB is not available");

export const connectDB = async () => {
  try {
    const { connection } = await connect(URL_MONGO_DB_ATLAS);
    if (connection.readyState === 1) {
      console.log("MongoDB connection");
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(false);
  }
};
