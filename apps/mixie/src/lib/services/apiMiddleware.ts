import { env } from "env";
import { authOptions } from "@/server/auth";
import { getServerAuthSession } from "@/server/auth";
import type { NextRequest } from "next/server";

export const isApp = async (req: NextRequest) => {
  try {
    const Authorization = req.headers.get("Authorization");

    if (!Authorization) {
      return false;
    }

    if (Authorization == `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

export const isAuthenticated = async (req: NextRequest) => {
  const session = await getServerAuthSession();

  if (!session) {
    return false;
  }

  return true;
};
