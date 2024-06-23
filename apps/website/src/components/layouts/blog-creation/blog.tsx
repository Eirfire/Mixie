"use client";
import { updateBlog } from "@/actions/blog/update-blog";
import Editor from "@/components/editor";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Blog, NewBlog, blogEditSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAction } from "next-safe-action/hooks";
import { EditorInstance, JSONContent } from "novel";
import React from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

interface BlogEditorProps {
  blog: NewBlog;
}

const BlogEditor = ({ blog }: BlogEditorProps) => {
  const [content, setContent] = React.useState<string | undefined>(undefined);
  const [saveStatus, setSaveStatus] = React.useState("Not saved");

  const form = useForm<NewBlog>({
    resolver: zodResolver(blogEditSchema),
    defaultValues: {
      ...blog
    },
  });
  const { setValue, handleSubmit, register } = form;

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      setValue("content", editor.getHTML());
      setSaveStatus("Saved Locally");
    },
    500
  );

  const update = useAction(updateBlog, {
    onError: () => {
      setSaveStatus("Error");
    },
    onSuccess: (data) => {
      setSaveStatus("Saved");
    },
  });

  const onSubmit = async (data: NewBlog) => {
    setSaveStatus("Saving...");
    console.log("data", data);
    try {
      await update.execute(data);
    } catch (error) {
      console.error("Error saving blog", error);
      setSaveStatus("Error");
    }
    setSaveStatus("Saved");
  };

  return (
    <Form {...form}>
      <form
        id="blog-form"
        className="md:w-1/2 w-full space-y-2 mx-auto items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input placeholder="Title" {...register("title")} />
        <ImageUpload />
        <Editor onChange={debouncedUpdates} />

        
        <div className="flex justify-end gap-2">
          <Button form="blog-form" type="submit" variant="secondary">
            Save
          </Button>
          <Button
            form="blog-form"
            type="submit"
            onClick={() => {
              setValue("published", true);
            }}
          >
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogEditor;
