import mongoose from "mongoose";

export const ThreadSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
    parentId: {
      type: String,
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  },
  {
    timestamps: true,
  }
);

export type ThreadDocument = mongoose.InferSchemaType<typeof ThreadSchema>;

export const Thread =
  mongoose.models?.Thread || mongoose.model("Thread", ThreadSchema);
