import { isApp } from "@/lib/services/apiMiddleware";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db/index";
import { users } from "@/server/db/schemas";
import { userSchema } from "@/types/zodSchemas";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const app = await isApp(req);
    const session = await getServerAuthSession();

    const requestedUserData = session?.user.id === params.userId;

    if ((!app || !session) && !requestedUserData) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    json.emailVerified = new Date(json.emailVerified);
    console.log("Body: ", json);

    const newUser = userSchema.parse(json);

    await db.update(users).set(newUser).where(eq(users.id, params.userId));

    console.log("User updated: ", newUser);

    return NextResponse.json(
      {
        message: "User updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on /users/[id]/updateUser", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
