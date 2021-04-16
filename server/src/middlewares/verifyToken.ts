import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export default function verifyTokenMw(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get token from header
  const token = req.header("x-auth-token");
  // check for no token
  if (!token) {
    return res.status(403).json({ msg: "No token, not autherized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token is not valid." });
  }
}
