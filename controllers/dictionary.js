import Dictionary from "../models/dictionary.js";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();
export const addword = async (req, res) => {
  const { newWord } = req.body;
  console.log(newWord);
  try {
    const { data } = await axios.get(
      `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${newWord}?fields=definitions%2Cexamples%2Cpronunciations%2CvariantForms&strictMatch=true`,
      {
        headers: {
          Accept: "application/json",
          app_id: process.env.APP_ID,
          app_key: process.env.APP_KEY,
        },
      }
    );
    const audioFile =
      data.results[0].lexicalEntries[0].entries[0].pronunciations[1].audioFile;
    const examples =
      data.results[0].lexicalEntries[0].entries[0].senses[0].examples;
    const definitions =
      data.results[0].lexicalEntries[0].entries[0].senses[0].definitions;
    const lexicalCategory =
      data.results[0].lexicalEntries[0].lexicalCategory.text;
    const word = {
      title: newWord,
      examples,
      definitions,
      lexicalCategory,
      audioFile,
    };

    //saving the word in dataBase

    //check if this word is already in database or not
    const title = word.title;
    const wordExist = await Dictionary.findOne({ title });
    //if word already there in database
    if (wordExist) {
      return res.status(200).json({ message: "Word already exist" });
    }
    //if word is not present in database
    //create a new word
    const newDictionaryWord = new Dictionary(word);
    //save the word in database
    await newDictionaryWord.save();
    res.status(201).json(newDictionaryWord);
  } catch (error) {
    console.log("Error", error.message);
    res.status(200).json({ message: "word not found" });
  }
};
export const allwords = async (req, res) => {
  try {
    const data = await Dictionary.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
};
export const searchword = async (req, res) => {
  const title = req.params.title;
  
  var regex = new RegExp(req.params.title, "i");
  try {
    const data = await Dictionary.find({ title: regex });
    
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
