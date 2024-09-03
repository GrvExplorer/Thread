"use server";

import { connectToDB } from "@/db";
import { Community } from "./models/community.model";
import { Thread } from "./models/thread.model";
import User from "./models/user.model";

// user
export const fetchUserById = async (userId: string) => {
  try {
    await connectToDB();

    const user = await User.findOne({ id: userId }).exec();

    if (!user) {
      throw new Error(`Failed to fetch user`);
    }

    return await JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    console.error(error);
  }
};

export const fetchAuthorById = async (authorId: string) => {
  try {
    await connectToDB();

    const user = await User.findById(authorId).exec();

    if (!user) {
      throw new Error(`Failed to fetch user`);
    }

    return JSON.stringify(user);
  } catch (error: any) {
    console.error(error);
  }
};

export const fetchUsers = async ({ count }: { count: number }) => {
  try {
    await connectToDB();

    // FIXME: indexing
    const users = await User.find().limit(count).exec();

    if (!users) {
      throw new Error(`Failed to fetch users`);
    }

    return users;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUsers = async () => {
  try {
    await connectToDB();

    // FIXME: indexing
    const users = await User.find({}).exec();

    if (!users) {
      throw new Error(`Failed to fetch users`);
    }

    return JSON.stringify(users);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserReplies = async (userId: string) => {
  try {
    await connectToDB();

    const allThreads = await Thread.find({ author: userId }).exec();

    if (!allThreads) {
      throw new Error("Failed to fetch threads");
    }

    const replies = allThreads.map((thread) => {
      if (thread.parentId) {
        return thread;
      }
    });

    if (!replies) {
      return null;
    }

    return JSON.stringify(replies);
  } catch (error) {
    console.log(error);
  }
};

// thread
export const fetchThreadById = async (threadId: string) => {
  try {
    await connectToDB();

    const thread = await Thread.findOne({ _id: threadId })
      .populate({
        path: "children",
        model: Thread,
        select: "text _id createdAt parentId",
        populate: [
          {
            path: "author",
            model: User,
            select: "id name image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "id name image",
            },
          },
          {
            path: 'community',
            model: Community,
            select: 'id name image',
          },
        ],
      })
      .populate({
        path: "community",
        model: Community,
        select: "id name image",
      })
      .populate({
        path: "author",
        model: User,
        select: "id name image",
      })
      .exec();

    if (!thread) {
      throw new Error(`Failed to fetch thread`);
    }
    return thread;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllThreads = async () => {
  try {
    await connectToDB();

    // FIXME: indexing and pagination
    const threads = await Thread.find({})
      .populate({
        path: "author",
        model: User,
        select: "id name image",
      })
      .populate({
        path: "community",
        model: Community,
        select: "name id image",
      })
      .populate({
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "id name image",
        },
      })
      .exec();

    if (!threads) {
      throw new Error(`Failed to fetch threads`);
    }

    return threads;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllThreadsOfUser = async (userId: string) => {
  try {
    await connectToDB();

    const userThreads = await Thread.find({ author: userId , parentId: null })
      .populate({
        path: "children",
        model: Thread,
        populate: {
          path: 'author',
          model: User,
          select: 'id image name',
        }
      })
      .populate({
        path: "community",
        model: Community,
        select: 'id image name'
      })
      .populate({
        path: "author",
        model: User,
        select: 'id image name'
      })
      .exec();

    if (!userThreads) {
      throw new Error(`Failed to fetch threads`);
    }

    return userThreads;
  } catch (error) {
    console.log(error);
  }
};

export const fetchThreadReplies = async (threadId: string) => {
  try {
    await connectToDB();

    const replies = await Thread.find({ parentId: threadId })
      .populate({
        path: "children",
        model: Thread,
      })
      .populate({
        path: "community",
        model: Community,
      })
      .populate({
        path: "author",
        model: User,
      })
      .exec();

    if (!replies) return;

    return JSON.stringify(replies);
  } catch (error) {
    console.error(error);
  }
};
