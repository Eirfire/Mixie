import { createClient } from "@/server/supabase/server";
import { notFound } from "next/navigation";

// TODO: display the blogs in a pretty format with good highlighting and much more
export default async function BlogPage({
  params,
}: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: blog } = await supabase
    .from("blog")
    .select()
    .eq("slug", params.slug).single();

  if (!blog) {
    return notFound();
  }

  return <div>{blog}</div>;
}
