import Express from "express";
import { getPosts, addPost, delPost } from "../controllers/post-control.js";

const router = Express.Router();

router.get("/", (req, res) => {
  res.send("Responding to post related request.");
});

router.get("/get-posts", getPosts);
router.post("/add-post", addPost);
router.delete("/del-post", delPost);

export default router;
