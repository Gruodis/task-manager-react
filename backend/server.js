import express, { json } from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(json());
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
