export type TProfileState = {
  profile: null;
  profiles: string[];
  repos: string[];
  loading: boolean;
  error: {
    msg?: string;
    status?: string;
  };
};

export type IExperience = {
  title: string;
  company: string;
  location?: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
};

export type IEducation = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
};

export type IProfile = {
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
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    twitch?: string;
  };
  date: Date;
};

export type NewProfileFormData = {
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string;
  githubUsername: string;
  bio: string;
  youtube: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  twitch: string;
};