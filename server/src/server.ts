import cors from "cors";
import * as dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db";

import AuthRoutes from "./routes/auth";
import UserRoutes from "./routes/users";
import ProfileRoutes from "./routes/profile";
import PostsRoutes from "./routes/posts";

dotenv.config();

// setup
const app: Express = express();

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
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/posts", PostsRoutes);

export default app;
