import { createClient } from "@/server/supabase/server";

// TODO: make it so it pulls all the latest blogs posts and puts them in a list
export default async function BlogLandingPage() {
  const supabase = createClient();
  const { data: blogs } = await supabase.from("blog").select();

  return <h1>Blogs</h1>;
}
