import Express from "express";
import { getPost, addPost, delPost } from "../controllers/post-control.js";

const router = Express.Router();

router.get("/", (req, res) => {
  res.send("Responding to post related request.");
});

router.get("/get-post", getPost);
router.post("/add-post", addPost);
router.delete("/del-post", delPost);

export default router;
