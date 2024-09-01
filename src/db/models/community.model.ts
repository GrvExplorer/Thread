import { model, models, Schema } from "mongoose";

const CommunitySchema = new Schema({
  id: {
    type: String,
    require: true,
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
      type: Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, {
  timestamps: true,
});

export const Community = models?.Community || model("Community", CommunitySchema);
