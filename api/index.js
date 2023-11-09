// import authRoutes from "./routes/auth-route.js";
import postRoutes from "./routes/posts-route.js";
import likeRoutes from "./routes/likes-route.js";
import commentRoutes from "./routes/comments-route.js";
import accountRoutes from "./routes/accounts-route.js";

import Express from "express";
const app = Express();

import cookieParser from "cookie-parser";
import cors from "cors";

// middleware
app.use(Express.json());
app.use(cors());
app.use(cookieParser());

// app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/account", accountRoutes);

app.get("/", (req, res) => {
  res.send("Responding to request for main page.");
});

app.listen(8800, test);

function test() {
  console.log("App is listening on port 8800");
}
