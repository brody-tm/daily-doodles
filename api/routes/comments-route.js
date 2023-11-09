import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Responding to comment related request.");
});

export default router;
