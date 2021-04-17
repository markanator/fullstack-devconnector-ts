import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import verifyTokenMw from "../middlewares/verifyToken";
import Post from "../models/Post";
import User from "../models/User";

const router = express.Router();

// @route   POST api/posts
// @desc    create post
// @access  Auth
router.post(
  "/",
  verifyTokenMw,
  [check("text", "Text is required.").not().isEmpty()],
  async (req: Partial<Request>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user!.id).select("-password");
      if (!user) return res.status(400).json({ msg: "Nothing Found." });

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user!.id,
      });

      const post = await newPost.save();

      return res.status(201).json(post);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server error." });
    }
  }
);

// @route   GET api/posts
// @desc    get all posts
// @access  Public
router.get(
  "/",
  verifyTokenMw,
  async (_req: Partial<Request>, res: Response) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      if (!posts) return res.status(404).json({ msg: "Nothing Found" });

      return res.status(200).json(posts);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server error." });
    }
  }
);

// @route   GET api/posts
// @desc    get all posts
// @access  Public
router.get(
  "/:id",
  verifyTokenMw,
  async (req: Partial<Request>, res: Response) => {
    try {
      const post = await Post.findById(req.params!.id);
      if (!post) return res.status(404).json({ msg: "Nothing Found" });

      return res.status(200).json(post);
    } catch (error) {
      console.log(error.message);
      if (error.kind === "ObjectId")
        return res.status(404).json({ msg: "Nothing Found" });

      return res.status(500).json({ msg: "Server error." });
    }
  }
);

// @route   Delete api/posts/:id
// @desc    delete by id
// @access  Public
router.delete(
  "/:id",
  verifyTokenMw,
  async (req: Partial<Request>, res: Response) => {
    try {
      const post = await Post.findById(req.params!.id);
      if (!post) return res.status(404).json({ msg: "Nothing Found" });

      // check user
      if (post.user.toString() !== req.user!.id)
        return res.status(401).json({ msg: "User not authorized" });

      await post.remove();

      return res.status(200).json({ msg: "Post removed!" });
    } catch (error) {
      console.log(error.message);
      if (error.kind === "ObjectId")
        return res.status(404).json({ msg: "Nothing Found" });

      return res.status(500).json({ msg: "Server error." });
    }
  }
);

// @route   Delete api//posts/like/:id
// @desc    delete by id
// @access  Public
router.put("/like/:id", verifyTokenMw, async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params!.id);
    if (!post) return res.status(404).json({ msg: "Nothing Found" });

    // check if already like by current user
    if (
      post.likes.filter((like) => like.user.toString() === req.user!.id)
        .length > 0
    )
      return res.status(400).json({ msg: "Post already liked!" });

    post.likes.unshift({ user: req.user!.id });

    await post.save();

    return res.status(200).json(post.likes);
  } catch (error) {
    console.log("ERR", error);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Nothing Found" });

    return res.status(500).json({ msg: "Server error." });
  }
});

// @route   Delete api//posts/unlike/:id
// @desc    delete by id
// @access  Public
router.put(
  "/unlike/:id",
  verifyTokenMw,
  async (req: Request, res: Response) => {
    try {
      const post = await Post.findById(req.params!.id);
      if (!post) return res.status(404).json({ msg: "Nothing Found" });

      // check if already like by current user
      if (
        post.likes.filter((like) => like.user.toString() === req.user!.id)
          .length === 0
      )
        return res.status(400).json({ msg: "Post not liked!" });

      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user!.id);

      if (removeIndex < 0)
        return res.status(400).json({ msg: "Nothing found." });

      post.likes.splice(removeIndex, 1);

      await post.save();

      return res.status(200).json(post.likes);
    } catch (error) {
      console.log("ERR", error);
      if (error.kind === "ObjectId")
        return res.status(404).json({ msg: "Nothing Found" });

      return res.status(500).json({ msg: "Server error." });
    }
  }
);

export default router;
