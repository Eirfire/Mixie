// TODO: display the blogs in a pretty format with good highlighting and much more
export default function BlogPage({ params }: { params: { blogId: string } }) {
  return <h1>{params.blogId}</h1>;
}
