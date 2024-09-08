"use server";
import { connectToDB } from "@/db";
import { Thread } from "@/db/models/thread.model";
import User from "@/db/models/user.model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

// user
export const updateUser = async (user: any) => {
  try {
    await connectToDB();

    const usernameNotAvailable = await User.findOne({
      username: user.username.toLowerCase().replace(/ /g, ""),
    });

    if (usernameNotAvailable && usernameNotAvailable.id !== user.userId) {
      return {
        status: 409,
        success: false,
        message: "Username already exists",
      };
    }

    const updateUser = await User.findOneAndReplace(
      { id: user.userId },
      {
        id: user.userId,
        name: user.name,
        image: user.image,
        username: user.username.toLowerCase().replace(/ /g, ""),
        bio: user.bio,
        onboarded: true,
      },
      {
        upsert: true,
        timestamps: true,
      }
    );

    if (user.path.includes("/edit")) {
      revalidatePath(`/profile/${user.userId}`, "page");
    }

    return {
      status: 200,
      success: true,
      user: updateUser,
    };
  } catch (error) {
    // console.error(error);
    // console.log(error);
    if (error instanceof mongoose.Error) {
      // switch (error.cause) {
      //   case "E11000":
      //     return {
      //       status: 409,
      //       success: false,
      //       error: error.cause,
      //       message: "Username already exists",
      //     };
      //   default:
      //     console.log("default: ", error);
      //     return {
      //       status: 500,
      //       success: false,
      //       error: error.cause,
      //     };
      // }
    }

    throw error;
  }
};

export const getActivity = async (userId:string) => {
  try {
    
    const userThreads = await Thread.find({author: userId})

    const userThreadsRepliesIds = userThreads.reduce((prev, current) => {
      return prev.concat(current.children)
    }, []) 

    
    const actualRepliesToThread = await Thread.find({
      _id: {$in: userThreadsRepliesIds},
      author: {$ne: userId},
    }).populate({
      path: 'author',
      model: User,
      select: 'image name'
    })


    return actualRepliesToThread;
  } catch (error) {
    console.log("🚀 ~ file: user.actions.ts:79 ~ getActivity ~ error:", error)

    
  }
}