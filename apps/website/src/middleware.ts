import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/server/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = await updateSession(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/admin",
    "/recipes/preview/:path*",
    "/recipes/create",
  ],
};
