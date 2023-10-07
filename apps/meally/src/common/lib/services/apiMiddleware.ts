import type { NextRequest } from "next/server";
import * as crypto from "crypto";
import { env } from "@/env.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/db/next-auth-adapter";
import JWT from "./apiHandle";
import * as jose from "jose";

export const isApp = async (req: NextRequest) => {
  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const jwt = req.headers.get("authorization");

    if (!jwt) {
      return false;
    }


    const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
      algorithms: ["HS256"],
    });

    if (payload.app == env.API_APP_TOKEN) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

export const isAuthenticated = (req: NextRequest): boolean => {
  const session = getServerSession(authOptions);

  if (!session) {
    return false;
  }

  return true;
};
