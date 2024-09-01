import { z } from "zod";

export const OnBoardingValidation = z.object({
  profile_url: z.string().url().min(1),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." }).max(12, {
      message: "Maximum 12 characters.",
      // FIXME: FOR not able to enter only numbers in username
    }).refine((val) => val.length <= 12, {
      message: "Maximum 12 characters.",
    }),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
})

export const ThreadValidation = z.object({
  thread: z.string().min(3, { message: "Minimum 3 characters." }),
  author: z.string()
})