import BlogEditor from "@/components/layouts/blog-creation/blog";
import { createClient } from "@/server/supabase/server";
import React from "react";

const BlogEditorPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data: blog } = await supabase
    .from("blog")
    .select("*")
    .eq("blog_id", params.id)
    .single();

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return <BlogEditor blog={blog} />;
};

export default BlogEditorPage;
