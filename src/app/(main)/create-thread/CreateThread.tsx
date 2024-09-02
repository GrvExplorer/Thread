"use client";
import { createThread } from "@/actions/thread.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ThreadValidation } from "@/validation/form.validation";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

function CreateThread({ authorId }: { authorId: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const { organization } = useOrganization()

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      author: authorId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    // thread creation login
    const createdThread = await createThread({
      thread: values.thread,
      author: values.author,
      community: organization ? organization.id : null,
    });

    if (createdThread.success === false) {
      toast({
        title: "Error",
        description: createdThread.error,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Thread created successfully",
    });
    form.reset({});

    // router.push('/feed')
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="account-form_input"
                    rows={12}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-primary-500 w-full">
            Post Thread
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateThread;
