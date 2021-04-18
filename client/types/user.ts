export type TUser = {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  created_at?: Date;
  __v?: number;
};

export type TRegUser = {
  name: string;
  email: string;
  password: string;
};

export type TLoginInfo = {
  email: string;
  password: string;
};
