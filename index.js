import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/index.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 5030;
app.listen(port, () => {
  console.log(`Mode: ${process.env.MODE || "DEV"}`);
  console.log(chalk.bold.green(`Server is up on port: ${port}`));
});
