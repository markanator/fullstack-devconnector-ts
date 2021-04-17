import express from "express";
import { check } from "express-validator";
import verifyTokenMw from "../middlewares/verifyToken";
import * as pCon from "../controller/postController";

const router = express.Router();

// @route   POST api/posts
// @desc    create post
// @access  Auth
router.post(
  "/",
  verifyTokenMw,
  [check("text", "Text is required.").not().isEmpty()],
  pCon.CreatePost
);

// @route   GET api/posts
// @desc    get all posts
// @access  Public
router.get("/", verifyTokenMw, pCon.FetchAllPosts);

// @route   GET api/posts/:id
// @desc    get post by id
// @access  Public
router.get("/:id", verifyTokenMw, pCon.FetchById);

// @route   Delete api/posts/:id
// @desc    delete by id
// @access  Public
router.delete("/:id", verifyTokenMw, pCon.DeletePostById);

// @route   Delete api/posts/like/:id
// @desc    delete by id
// @access  Public
router.put("/like/:id", verifyTokenMw, pCon.LikePost);

// @route   Delete api//posts/unlike/:id
// @desc    delete by id
// @access  Public
router.put("/unlike/:id", verifyTokenMw, pCon.UnlikePost);

// @route   POST api/posts/comment/:id
// @desc    create comment
// @access  Auth
router.post(
  "/comment/:id",
  verifyTokenMw,
  [check("text", "Text is required.").not().isEmpty()],
  pCon.PostComment
);

// @route   Delete api/posts/comment/:id/:commentId
// @desc    delete comment
// @access  Public
router.delete("/comment/:postId/:commentId", verifyTokenMw, pCon.DeleteComment);

export default router;
