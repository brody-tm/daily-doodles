import express from "express";
import { setPic, getName, getPic, getProfile, setName, setBio, setLikes, setFollows, getBio, getLikes, getFollows, setProfile } from "../controllers/profiles-control.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Responding to profile related request.");
});

router.get("/get-profile", getProfile);//DOES THIS NEED /:userID in it??
router.get("/get-name", getName);
router.get("/get-pic", getPic);
router.get("/get-bio", getBio);
router.get("/get-likes", getLikes);
router.get("/get-follows", getFollows);

router.put("/change-profile", setProfile);
router.put("/change-name", setName);
router.put("/change-pic", setPic);
router.put("/change-bio", setBio);
router.put("/change-likes", setLikes);
router.put("/change-follows", setFollows);

export default router;
