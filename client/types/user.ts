export type TUser = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  created_at?: Date;
};

export type TRegUser = {
  name: string;
  email: string;
  password: string;
};
