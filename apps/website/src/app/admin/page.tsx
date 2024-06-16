import BlogCard from "@/components/cards/blog";
import BlogEditor from "@/components/layouts/blog-creation/blog";
import CreateBlogModal from "@/components/layouts/blog-creation/create-blog-modal";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { blogSchema } from "@/types";
import React from "react";

const AdminPage = async () => {
  const supabase = createClient();
  const { data: blogs } = await supabase.from("blog").select("*");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      AdminPage
      <div>
        <h2>Blogs</h2>
        <div>
          {blogs && blogs?.length > 0 ? (
            blogs?.map((blog) => (
              <BlogCard blog={blog} edit={true} key={blog.blog_id} />
            ))
          ) : (
            <>
              <div>No blogs found</div>
              <CreateBlogModal />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
