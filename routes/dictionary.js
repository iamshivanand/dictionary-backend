import express from "express";

import { addword, allwords, searchword } from "../controllers/dictionary.js";

const router = express.Router();

router.post("/addWord", addword);
router.get("/allWords", allwords);
router.get("/search/:title", searchword);

export default router;
