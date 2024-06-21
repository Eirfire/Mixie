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
    <Link
      href={edit ? `/admin/blog/${blog.blog_id}` : `/blog/${blog.blog_id}`}
      className="relative flex h-32 w-full flex-row gap-2 rounded-md bg-secondary"
    >
      <Image
        src={blog?.image_url || "/images/placeholder.webp"}
        alt={blog.title}
        width={100}
        height={100}
        className="h-32 w-2/5 min-w-32 rounded-lg object-cover object-center"
      />

      <div className="text-step--2 sm:text-step--1">
        <h3>{blog.title}</h3>
        <p>{blog.updated_at}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
