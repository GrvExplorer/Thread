import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  threads: string[];
  onboarded: boolean;
  communities: string[];
}

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",  
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
}, {
  timestamps: true,
});

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;