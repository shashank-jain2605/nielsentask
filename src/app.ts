import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// app.get("/hello", (req, res) => {
//   res.send("hello sir");
// });

// routes:
// import taskRouter from "./routes/task.routes.js";

import taskRouter from "./router/task.routes";

app.use("/api/v1/tasks", taskRouter);

export { app };
