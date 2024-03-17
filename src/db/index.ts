import mongoose, { ConnectOptions } from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async (): Promise<void> => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log(
      `database connected!! :)👻 at ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
