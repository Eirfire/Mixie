"use client";
import Editor from "@/components/editor";
import ImageUpload from "@/components/image-upload";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Blog, blogEditSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorInstance, JSONContent } from "novel";
import React from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

interface BlogEditorProps {
  blog: Blog;
}

const BlogEditor = ({ blog }: BlogEditorProps) => {
  const [content, setContent] = React.useState<string | undefined>(undefined);
  const [saveStatus, setSaveStatus] = React.useState("Not saved");

  
  const form = useForm({
    resolver: zodResolver(blogEditSchema),
    defaultValues: blog,
  });
  const { setValue, handleSubmit } = form;

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      setContent(editor.getHTML());
      setSaveStatus("Saved Locally");
    },
    500
  );

  const onSubmit = (data) => {};

  return (
    <Form {...form}>
      <form
        className="md:w-1/2 w-full space-y-2 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input placeholder="Title" defaultValue={blog?.title ?? ""} />
        <ImageUpload />
        <Editor onChange={debouncedUpdates} />
      </form>
    </Form>
  );
};

export default BlogEditor;
