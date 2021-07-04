import mongoose from "mongoose";

const dictionarySchema = mongoose.Schema({
  title: String,
  examples: [Object],
  definitions: [String],
  lexicalCategory: String,
  audioFile: String,
});

export default mongoose.model("Dictionary", dictionarySchema);
