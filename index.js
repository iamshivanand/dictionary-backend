import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import dictionaryRoutes from "./routes/dictionary.js";
// import oxfordRoutes from "./routes/oxford.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// app.use("/oxford", oxfordRoutes);
app.use("/dictionary", dictionaryRoutes);
app.get("/", (req, res) => {
  res.send(
    "Welcome Aboard!!"
  );
});

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(
      PORT,
      console.log(`server is up and database is connected on PORT: ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.set("useFindAndModify", false);
