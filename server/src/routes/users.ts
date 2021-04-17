import argon2 from "argon2";
import express from "express";
import { check, validationResult } from "express-validator";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import User from "../models/User";

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
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // see if user exists => true? error
      let user = await User.findOne({ email });
      if (user) {
        // console.log(user);
        return res.status(400).json({
          errors: [
            {
              msg: "User already exists",
            },
          ],
        });
      }
      // get users gravatar
      const avatar = gravatar.url(email, {
        s: "300",
        rating: "pg",
        default: "mm",
        protocol: "https",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // encrypt password
      user.password = await argon2.hash(password);

      await user.save();

      // return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          // all good
          return res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).send("server error");
    }
  }
);
export default router;
