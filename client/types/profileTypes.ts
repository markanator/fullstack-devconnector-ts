export type TProfileState = {
  profile: IProfile | null;
  profiles: any[];
  repos: any[];
  loading: boolean;
  error: {
    msg?: string;
    status?: string;
  };
};

export type IExperience = {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
};

export type IEducation = {
  _id?: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
};

export type IProfile = {
  _id?: string;
  user: {
    _id?: string;
    name?: string;
    avatar?: string;
  };
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
