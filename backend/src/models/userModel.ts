import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  offeredSkill?: string;
  portfolio?: string;
  profileCompleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    bio: {
      type: String,
    },
    offeredSkill: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    profileCompleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
