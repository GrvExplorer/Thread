"use client";

import { onBoardUser, updateUser } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isBase64Image, useUploadThing } from "@/utils/utils";
import { OnBoardingValidation } from "@/validation/form.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

function AccountProfileEdit({ user, btnTitle }: { user: any; btnTitle: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");
  const { toast } = useToast()
 
  const form = useForm({
    resolver: zodResolver(OnBoardingValidation),
    defaultValues: {
      profile_url: user.image ? user.image : "",
      name: user.name ? user.name : "",
      username: user.username ? user.username : "",
      bio: user.bio ? user.bio : "",
    },
  });

  async function handleImage(
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      const fileReader = new FileReader();

      if (!file.type.includes("image")) return;

      // execute when file is loaded
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      console.log("started reading the path as url");
      // start the function of reading the path as url
      fileReader.readAsDataURL(file);
    }
  }

  async function onSubmit(values: z.infer<typeof OnBoardingValidation>) {
    const blog = values.profile_url;

    const hasImageChanged = isBase64Image(blog);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_url = imgRes[0].url;
      }
    }

    const newUser = await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user.id,
      bio: values.bio,
      image: values.profile_url,
    });

    if (newUser?.status === 409) {
      toast({
        title: 'User not created'
      })
      form.setError("username", { message: "Username already taken" });
      return;
    }

    toast({
      title: 'User created'
    })

    // router.push("/feed");
  }

  return (
    <section className="mt-9 w-full">
      <Card className="bg-dark-4 p-10 h-full text-light-2">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="profile_url"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center cursor-pointer">
                  <FormLabel className="rounded-full justify-center items-center flex w-[80px] h-[60px] bg-white ">
                    <Avatar className="w-20 h-20">
                      {field.value ? (
                        <AvatarImage src={field.value} />
                      ) : (
                        <AvatarImage src={user.image} />
                      )}
                      <AvatarFallback>
                        <Image
                          src="/assets/profile.svg"
                          alt="profile_icon"
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </FormLabel>
                  <FormControl className="cursor-pointer">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Upload Image"
                      className="account-form_image-input"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl className="bg-dark-2">
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl className="bg-dark-2">
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>bio</FormLabel>
                  <FormControl className="bg-dark-2">
                    <Textarea rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-primary-500">
              {btnTitle}
            </Button>
          </form>
        </Form>
      </Card>
    </section>
  );
}

export default AccountProfileEdit;
