import express from "express";
import { getPrompt } from "../controllers/prompt-control.js";

const router = express.Router();

router.get("/", getPrompt);

export default router;
