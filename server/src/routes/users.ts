import express from "express";
import { check } from "express-validator";
import * as usrCon from "../controller/userController";

const router = express.Router();

// @route   POST api/users
// @desc    register route
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email.").isEmail(),
    check(
      "password",
      "Please enter a valid password longer than 6 characters."
    ).isLength({ min: 6 }),
  ],
  usrCon.RegNewUser
);
export default router;
