import { model, Schema, Model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  created_at?: Date;
}

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> = model("user", UserSchema);

export default User;
