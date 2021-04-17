export interface IProfileFields {
  user?: string;
  company?: string;
  website?: string;
  location?: string;
  bio?: string;
  status?: string;
  githubUsername?: string;
  skills?: string[];
  social?: {
    youtube?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    twitch?: string;
  };
}
