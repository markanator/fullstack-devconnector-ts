import { Request } from "express";

export type mReq = {
  req: Request & {
    user: {
      id: string;
    };
  };
};
