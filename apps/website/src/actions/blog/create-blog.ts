"use server";

import { action } from "@/actions/safe-action";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { blogEditSchema } from "@/types";

export const createBlog = action(blogEditSchema, async (blog) => {
  const supabase = createClient();

  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }


  const { data, error } = await supabase
    .from("blog")
    .insert({
        ...blog,
        author_id: user.id,
    })
    .select("blog_id")
    .single();

  if (error) {
    console.error("Database error occurred", error);
    throw new Error(error.message);
  }

  return data.blog_id;
});
