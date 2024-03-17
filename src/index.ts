import connectDB from "./db/index";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection failed", err);
  });
