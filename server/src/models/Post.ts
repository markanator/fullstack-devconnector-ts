import { model, Schema, Model, Document } from "mongoose";

export interface ILikes {
  user: string;
}

export interface IComments {
  user: string;
  text: string;
  name?: string;
  avatar?: string;
  date?: Date;
}

interface IPost extends Document {
  user: string;
  text: string;
  name: string;
  avatar?: string;
  likes: ILikes[];
  comments: IComments[];
  date?: Date;
}

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post: Model<IPost> = model("user", PostSchema);

export default Post;
