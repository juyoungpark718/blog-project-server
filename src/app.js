import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ExtendedAPIPlugin } from "webpack";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import postRouter from "./routes/postRouter";
import { pgConnect } from "./sequilzeConfig";
import dbMigrate from "./model/dbMigrate";

const app = express();
const PORT = 4000;
// Postgresql DB연결
dbMigrate(
  pgConnect("express-crud", process.env.DB_USERNAME, process.env.DB_PASSWORD)
);

app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World.");
});

app.use("/post", postRouter);

app.all("/secret", (req, res, next) => {
  console.log("Accessing the secret section ...");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
