import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import postRouter from "./routes/postRouter";
import { pgConnect } from "./sequilzeConfig";
import dbMigrate from "./model/dbMigrate";

const app = express();
const PORT = 4000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
// Postgresql DB연결
dbMigrate(
  pgConnect("express-crud", process.env.DB_USERNAME, process.env.DB_PASSWORD)
);

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

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
