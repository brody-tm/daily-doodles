import express from "express";
import { SetPic, getName, getPic, getProfile, setName } from "../controllers/profiles-control";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Responding to profile related request.");
});

router.get("/get-Profile", getProfile);//DOES THIS NEED /:userID in it??
router.get("/get-name", getName);
router.get("/get-prof-pic", getPic);

router.update("/change-name", setName);
router.update("/change-pic", SetPic);



export default router;
