import { connectToDB } from "@/db";
import { Community } from "@/db/models/community.model";
import User from "@/db/models/user.model";

export const createCommunity = async (
  id:string,
  name:string,
  username:string,
  image:string,
  bio:string,
  createdById:string,
) => {
  try {
    await connectToDB()
    
    const user = await User.findOne({ id: createdById });

    if (!user) throw new Error("User Not Found.");
    

    const community = new Community({
      id,
      name,
      username,
      image,
      bio,
      createdBy: user._id
    })

    const createdCommunity = await community.save()

    user.communities.push(createdCommunity._id)
    await user.save()

    if (!community) return {
      status: 300,
      success: false,
      message: 'Not able to create community.'
    }

    return {
      status: 200,
      success: true,
      message: 'Community created.',
      community: createCommunity,
    }

  } catch (error) {
    console.log(error);
    return {
      status: 500,
      success: false,
      message: 'Something went wrong',
      error: error.message
    }
    
  }
}