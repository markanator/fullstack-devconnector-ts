import axios from "axios";
import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import verifyTokenMw from "../middlewares/verifyToken";
import Profile, { IExperience } from "../models/Profile";
import User from "../models/User";
import * as profCon from "../controller/profileController";

const router = express.Router();

//? @route   GET api/profile/me
//? @desc    fetch profile based on token id
//? @access  Private
router.get("/me", verifyTokenMw, profCon.FetchMe);

//? @route   POST api/profile
//? @desc    create or update a user profile
//? @access  Private
router.post(
  "/",
  verifyTokenMw,
  [
    check("status", "Status is required.").not().isEmpty(),
    check("skills", "Skills is required").not().isEmpty(),
  ],
  profCon.RegUpdateUser
);

//? @route   GET api/profile
//? @desc    get ALL profiles
//? @access  Public
router.get("/", profCon.FetchAllProfs);

//? @route   GET api/profile
//? @desc    get profile by userid
//? @access  Public
router.get("/user/:userId", profCon.ProfById);

//? @route   GET api/profile
//? @desc    get profile by userid
//? @access  Public
router.delete("/user/:userid", verifyTokenMw, profCon.DeleteProf);

// ************************************
// *            EXPERIENCE
// ************************************

//? @route   Put api/profile/experience
//? @desc    add partial data
//? @access  Public
router.put(
  "/experience",
  verifyTokenMw,
  [
    check("title", "Missing title").not().isEmpty(),
    check("company", "Missing company").not().isEmpty(),
    check("from", "Missing from date").not().isEmpty(),
  ],
  profCon.EditProfilExp
);

//? @route   Put api/profile/experience
//? @desc    add partial data
//? @access  Public
router.delete("/experience/:expId", verifyTokenMw, profCon.DeleteProfExp);

// ************************************
// *            Education
// ************************************

//? @route   Put api/profile/education
//? @desc    add partial data
//? @access  Public
router.put(
  "/education",
  verifyTokenMw,
  [
    check("school", "Missing school").not().isEmpty(),
    check("degree", "Missing degree").not().isEmpty(),
    check("fieldOfStudy", "Missing field of study").not().isEmpty(),
    check("from", "Missing from date").not().isEmpty(),
  ],
  profCon.AddEditProfEdu
);

//? @route   Put api/profile/education
//? @desc    add partial data
//? @access  Public
router.delete("/education/:eduId", verifyTokenMw, profCon.DelProfEdu);

// ************************************
// *            Github
// ************************************
//? @route   Put api/profile/github/:username
//? @desc    add partial data
//? @access  Public
router.get("/github/:username", profCon.FetchGH);

export default router;
