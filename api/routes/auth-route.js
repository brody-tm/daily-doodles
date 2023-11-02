import express from "express";
import { registerAccount, login, logout } from "../controllers/auth-control.js";

const router = express.Router()

router.post("/register", registerAccount)
router.post("/login", login)
router.post("/logout", logout)

export default router
