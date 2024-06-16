import { constructMetadata } from "@/lib/utils";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = constructMetadata({
  title: "Admin Portal",
  description: "Admin Portal for Mixie admins",
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const supabase = createClient();

  if (!user) return notFound();

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  if (userProfile && userProfile.user_role !== "admin") {
    return notFound();
  }

  return children;
}
