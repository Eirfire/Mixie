"use server";

import { action } from "@/actions/safe-action";
import { recipeId } from "@/lib/utils";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { NewBlog, blogEditSchema } from "@/types";

export const updateBlog = action(blogEditSchema, async (blog) => {
  const supabase = createClient();

  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }
  console.log("blog", blog);

  const newBlog: NewBlog = {
    ...blog,
    slug: recipeId(blog.title),
    author_id: user.id,
  };

  console.log("newBlog", newBlog);

  const { data, error } = await supabase
    .from("blog")
    .update(newBlog)
    .eq("blog_id", newBlog.blog_id!)
    .select()
    .single();

  if (error) {
    console.error("Database error occurred", error);
    throw new Error(error.message);
  }

  console.log("data", data);

  return data.blog_id;
});
