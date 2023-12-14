import express from "express";
import { getGallery, getProfile, setProfile,setPic } from "../controllers/profiles-control.js";

const router = express.Router();

router.get("/get/:id", getProfile);

router.get("/gallery/:id",getGallery);
router.put("/edit", setProfile);
router.put("/pic", setPic);
export default router;
