import authRoutes from "./routes/auth-route.js";
import postRoutes from "./routes/posts-route.js";
import profileRoutes from "./routes/profiles-route.js";
import promptRoutes from "./routes/prompt-route.js";

import Express from "express";
const app = Express();
app.disable("x-powered-by"); // don't expose the framework being used

import cookieParser from "cookie-parser";
import cors from "cors";

// middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/prompt", promptRoutes);

app.get("/", (req, res) => {
  res.send("Responding to request for main page.");
});

app.listen(8800, test);

function test() {
  console.log("App is listening on port 8800");
}
