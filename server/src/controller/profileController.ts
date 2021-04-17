import axios from "axios";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Profile, { IExperience } from "../models/Profile";
import User from "../models/User";
import { IProfileFields } from "../types/IProfileFields";

const FetchMe = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.user!.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const RegUpdateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
    twitch,
  } = req.body;

  // build profile object

  const profileFields: IProfileFields = {};
  profileFields.user = req.user!.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubUsername) profileFields.githubUsername = githubUsername;
  if (skills) {
    profileFields.skills = skills.split(",").map((s: string) => s.trim());
  }

  // build social object
  // profileFields.social = {};
  if (youtube) profileFields.social!.youtube = youtube;
  if (facebook) profileFields.social!.facebook = facebook;
  if (twitter) profileFields.social!.twitter = twitter;
  if (instagram) profileFields.social!.instagram = instagram;
  if (linkedin) profileFields.social!.linkedin = linkedin;
  if (twitch) profileFields.social!.twitch = twitch;

  try {
    let profile = await Profile.findOne({ user: req.user!.id });

    //! update if there is one
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user!.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(profile);
    }

    //* create a new profile if not found
    profile = new Profile(profileFields);
    await profile.save();

    return res.status(201).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error." });
  }
};

const FetchAllProfs = async (_req: Request, res: Response) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    return res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error." });
  }
};

const ProfById = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(404).json({ msg: "No user found." });

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "No user found." });
    return res.status(500).json({ msg: "Error." });
  }
};

const DeleteProf = async (req: Request, res: Response) => {
  try {
    // remove profile
    await Profile.findOneAndRemove({ user: req.user!.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user!.id });

    return res.status(200).json({ msg: "User and profile deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
};

// ************************************
// *            EXPERIENCE
// ************************************

const EditProfilExp = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, company, location, from, to, current, description } = req.body;

  const newExp: IExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    // remove profile
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: "Nothing found" });

    profile.experience.unshift(newExp);

    await profile.save();

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
};

const DeleteProfExp = async (req: any, res: any) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: "Nothing found" });

    const removeIndex = profile.experience
      .map((item: any) => item.id)
      .indexOf(req.params.expId);

    if (removeIndex < 0) return res.status(404).json({ msg: "Nothing found" });

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    return res.status(200).json({ msg: "Experience deleted" });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ msg: "Server error." });
  }
};

// ************************************
// *            Education
// ************************************

const AddEditProfEdu = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { school, degree, fieldOfStudy, from } = req.body;

  const newEducation = {
    school,
    degree,
    fieldOfStudy,
    from,
  };

  try {
    // remove profile
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: "Nothing found" });

    profile.education.unshift(newEducation);

    await profile.save();

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
};

const DelProfEdu = async (req: any, res: any) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: "Nothing found" });

    const removeIndex = profile.education
      .map((item: any) => item.id)
      .indexOf(req.params.eduId);

    if (removeIndex < 0) return res.status(404).json({ msg: "Nothing found" });

    profile.education.splice(removeIndex, 1);

    await profile.save();

    return res.status(200).json({ msg: "Education deleted" });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ msg: "Server error." });
  }
};

const FetchGH = async (req: Request, res: Response) => {
  try {
    const GH_URL = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );

    const ghRes = await axios.get(GH_URL, {
      headers: {
        Authorization: `token ${process.env.GH_SECRET as string}`,
        "user-agent": "node.js",
      },
    });

    return res.status(200).json(ghRes.data);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ msg: "Server error." });
  }
};

export {
  FetchMe,
  RegUpdateUser,
  FetchAllProfs,
  ProfById,
  DeleteProf,
  EditProfilExp,
  DeleteProfExp,
  AddEditProfEdu,
  DelProfEdu,
  FetchGH,
};
