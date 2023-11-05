import express from "express";
import { getPost, addPost, deletePost } from "../controllers/post-control";

const router = express.Router();

router.get("/get-post", getPost);
router.post("/add-post", addPost);
router.delete("/del-post", deletePost);

export default router;
