import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function NotFoundUser() {
  const user = await currentUser();

  return (
    <>
      <h1>You can't access this page </h1>
      <Link href={`/${user!.id}/settings?activeLink=profile`}>
        View your settings
      </Link>
    </>
  );
}
