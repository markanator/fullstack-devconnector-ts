import express from "express";
import { check, validationResult } from "express-validator";
import verifyTokenMw from "src/middlewares/verifyToken";
import User from "src/models/User";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", verifyTokenMw, async (req, res) => {
  try {
    const user = await User.findById(req.user!.id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error occurred." });
  }
});

// @route   GET api/auth
// @desc    Authenticate user
// @access  Public
router.post(
  "/login",
  [
    check("email", "Missing email.").isEmail(),
    check("password", "Missing password.").exists(),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials." });
      }
      // check for password match
      const isMatch = await argon2.verify(user.password, password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials." });
      }
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
          //! LOGIN all good
          return res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);
export default router;
