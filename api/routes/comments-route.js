import express from "express";
import {
  getComments,
  addComment,
  delComment,
} from "../controllers/comment-control.js";

const router = express.Router();

// routes: specifiy the action that will occur when a get, post, or delete
// resuest is sent to /api/comment/

router.get("/", getComments);
router.post("/", addComment);
router.delete("/:id", delComment);

export default router;
