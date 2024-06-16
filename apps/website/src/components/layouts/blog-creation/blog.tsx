"use client";
import Editor from "@/components/editor";
import { Input } from "@/components/ui/input";
import { Blog } from "@/types";
import { EditorInstance, JSONContent } from "novel";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

interface BlogEditorProps {
  blog: Blog;
}

const BlogEditor = ({ blog }: BlogEditorProps) => {
  const [content, setContent] = React.useState<JSONContent | undefined>(
     undefined
  );
  const [saveStatus, setSaveStatus] = React.useState("Not saved");

  const debouncedUpdates = useDebouncedCallback(async (value: JSONContent) => {
    setContent(value);
    setSaveStatus("Saved Locally");
  }, 500);

  return (
    <div className="md:w-1/2 w-full space-y-2 mx-auto">
      <Input placeholder="Title" defaultValue={blog?.title ?? ""} />
      <Editor initialValue={content} onChange={debouncedUpdates} />
    </div>
  );
};

export default BlogEditor;
