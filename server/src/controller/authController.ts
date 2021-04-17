import argon2 from "argon2";
import { Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User";

const FetchCurrentTokenUser = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error occurred." });
  }
};

const LoginUser = async (req: any, res: Response) => {
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

    return jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: 1000 * 60 * 60 * 24, // one day
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        //! LOGIN all good
        return res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error." });
  }
};

export { FetchCurrentTokenUser, LoginUser };
