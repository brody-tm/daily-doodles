import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from "./routes/auth-route.js"

const app = express();

// middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth", authRoutes);

app.listen(8800, test);

function test() {
    console.log("test");
}