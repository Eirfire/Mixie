import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="m-auto">
      <h1>You are not an admin</h1>
      <p>You can only access this page if you are an admin</p>
    </div>
  );
}
