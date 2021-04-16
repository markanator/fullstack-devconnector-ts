import { model, Schema, Model, Document } from "mongoose";

export interface IExperience {
  title: string;
  company: string;
  location?: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
}

export interface IEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
}

interface IProfile extends Document {
  user: string;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills?: string[];
  bio?: string;
  githubUsername?: string;
  experience: IExperience[];
  education: IEducation[];
  social: {
    youtube?: String;
    twitter?: String;
    facebook?: String;
    linkedin?: String;
    instagram?: String;
    twitch?: String;
  };
  date: Date;
}

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  company: String,
  website: String,
  location: String,
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
  },
  bio: String,
  githubUsername: String,
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String,
    twitch: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile: Model<IProfile> = model("profile", ProfileSchema);

export default Profile;
