import express from "express";
import { check } from "express-validator";
import verifyTokenMw from "../middlewares/verifyToken";
import * as authController from "../controller/authController";

const router = express.Router();

// @route   GET api/auth
// @desc    fetch active user
// @access  Public
router.get("/", verifyTokenMw, authController.FetchCurrentTokenUser);

// @route   GET api/auth/login
// @desc    Authenticate user
// @access  Public
router.post(
  "/login",
  [
    check("email", "Missing email.").isEmail(),
    check("password", "Missing password.").exists(),
  ],
  authController.LoginUser
);

export default router;
