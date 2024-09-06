"use server";

import { connectToDB } from "@/db";
import { FilterQuery, SortOrder } from "mongoose";
import { Community } from "./models/community.model";
import { Thread } from "./models/thread.model";
import User from "./models/user.model";

// !!! user
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
    const users = await User.find()
      .sort({ createdAt: "desc" })
      .limit(count)
      .exec();

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

export const fetchUserPosts = async (id: string) => {
  try {
    const res = await User.findById(id).populate({
      path: "threads",
      model: Thread,
      select: "createdAt _id parentId text",
      populate: [
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
          path: "community",
          model: Community,
          select: "_id id name image",
        },
      ],
    });

    return res;
  } catch (error) {
    console.log("🚀 ~ file: data.ts:231 ~ fetchUserPosts ~ error:", error);
  }
};

// !!! thread
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
            path: "community",
            model: Community,
            select: "id name image",
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

export const fetchThreads = async () => {
  try {
    await connectToDB();

    const response = await Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .populate("author", "name id image")
      .populate({
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "id name image",
        },
      })
      .populate("community", "id name image")
      .exec();

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSearchThreads = async ({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) => {
  try {

    await connectToDB()

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof Thread> = {} 
    if (searchString.trim() !== ""){
      query.$or = [
        {text: { $regex: regex}}
      ]
    }else{
      return; 
    }

    const threadQuery = Thread.find(query)
    .populate("author", "name id image")
    .populate({
      path: "children",
      model: Thread,
      populate: {
        path: "author",
        model: User,
        select: "id name image",
      },
    })
    .populate("community", "id name image")

    return threadQuery;
  } catch (error) {
    console.log("🚀 ~ file: data.ts:201 ~ error:", error)
  }
};
// !!! Communities
export const fetchCommunities = async ({ count }: { count: number }) => {
  try {
    await connectToDB();

    // FIXME: indexing
    const communities = await Community.find()
      .sort({ createdAt: "desc" })
      .limit(count)
      .exec();

    if (!communities) {
      throw new Error(`Failed to fetch users`);
    }

    return communities;
  } catch (error) {
    console.log(error);
  }
};
