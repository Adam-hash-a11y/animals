import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

//nouns not verbs (getuser x) users
//plural  products
//nesting level max 3

app.post("/adam", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});