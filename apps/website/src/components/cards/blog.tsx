import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogCardProps {
  blog: Blog;
  edit?: boolean;
}

const BlogCard = ({ blog, edit = false }: BlogCardProps) => {
  return (
    <Link href={edit ? `/admin/blog/${blog.blog_id}` : `/blog/${blog.blog_id}`}>
      <h3>{blog.title}</h3>
      <p>{blog.updated_at}</p>

      <Image
        src={blog?.image_url || "/images/placeholder.webp"}
        alt={blog.title}
        width={200}
        height={200}
      />
    </Link>
  );
};

export default BlogCard;
