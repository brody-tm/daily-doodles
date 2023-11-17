import Express from "express";
import { getPosts, addPost, delPost } from "../controllers/post-control.js";

const router = Express.Router();

// routes: specifiy the action that will occur when a get, post, or delete
// resuest is sent to /api/post/

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id", delPost);

export default router;
