import express from "express";
import pageRouter from "./routes/page.routes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// Create server
const app = express();

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));
app.use(cookieParser("secret"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // process form data

// Routes
app.use("/", pageRouter);

// Start server
const PORT: number = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
