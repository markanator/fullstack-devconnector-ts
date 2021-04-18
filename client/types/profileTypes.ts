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
    youtube?: String;
    twitter?: String;
    facebook?: String;
    linkedin?: String;
    instagram?: String;
    twitch?: String;
  };
  date: Date;
};
