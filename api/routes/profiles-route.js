import express from "express";
import { setPic, getName, getPic, getProfile, setName } from "../controllers/profiles-control.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Responding to profile related request.");
});

router.get("/get-profile", getProfile);//DOES THIS NEED /:userID in it??
router.get("/get-name", getName);
router.get("/get-prof-pic", getPic);

router.get("/change-name", setName);
router.put("/change-pic", setPic);



export default router;
