import cors from "cors";
import * as dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db";

dotenv.config();

// setup
const app: Express = express();
const PORT = parseInt(process.env.PORT as string) || 7777;

// connect db
connectDB();

// MW
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// ROUTES
app.get("/", (_req, res) => res.send("API RUNNING"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, () => {
  console.log(`=== SERVER STARTED ON http://localhost:${PORT} ===`);
});
