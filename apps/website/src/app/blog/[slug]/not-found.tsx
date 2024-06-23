import Link from "next/link";

export default async function BlogPage({
  params,
}: { params: { slug: string } }) {
  return (
    <div className="m-auto">
      <h1 className="mb-5 text-step1 font-bold">Blog not found</h1>
      <p>The blog you are looking for does not exist.</p>
      <p>
        Please try again or go back to the<Link href="/blog">blog page</Link>.
      </p>
    </div>
  );
}
