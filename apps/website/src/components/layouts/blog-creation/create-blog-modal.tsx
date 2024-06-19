"use client";
import { createBlog } from "@/actions/blog/create-blog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { createClient } from "@/server/supabase/client";
import { NewBlog } from "@/types";
import { blogEditSchema } from "@/types/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateBlogModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createNewBlog = useAction(createBlog, {
    onError: (error) => {
      toast.error("Error creating blog");
      setLoading(false);
    },
    onSuccess: (data) => {
      toast.success(`Blog created`);
      setLoading(false);
      router.push(`/admin/blog/${data}`);
    },
  });

  const form = useForm<NewBlog>({
    resolver: zodResolver(blogEditSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = form;

  useEffect(() => {
    console.log(`error`, {
      errors,
      values: getValues(),
    });
  }, [errors]);

  const onSubmit: SubmitHandler<NewBlog> = async (data) => {
    setLoading(true);
    try {
      await createNewBlog.execute(data);
    } catch (error) {
      toast.error("Error creating blog");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({ size: "default", variant: "secondary" })}
        type="button"
      >
        Create a blog post
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a blog post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      {...field}
                      value={field.value ?? undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="blog_type"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="blog" value="blog">
                        Blog
                      </SelectItem>
                      <SelectItem key="release" value="release">
                        Release
                      </SelectItem>
                      <SelectItem key="announcement" value="announcement">
                        Announcement
                      </SelectItem>
                      <SelectItem key="event" value="event">
                        Event
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              aria-label="continue with creating the recipe"
              disabled={loading}
            >
              Create Blog
              {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogModal;
