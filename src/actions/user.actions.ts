"use server";

import { connectToDB } from "@/db";
import User from "@/db/models/user.model";
import mongoose from "mongoose";

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
      }
    );

    return {
      status: 200,
      success: true,
      user: JSON.stringify(updateUser),
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
