import { isApp } from "@/src/common/lib/services/apiMiddleware";
import { auth, currentUser } from "@clerk/nextjs";
import { db } from "@db/index";
import { users } from "@db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const app = await isApp(req);
    const { user: signedInUser } = await auth();

    const requestedUserData = signedInUser!.id === params.id;

    if ((!app || !signedInUser) && !requestedUserData) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, params.id),
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error on /users/[id]", error);
  }
}
