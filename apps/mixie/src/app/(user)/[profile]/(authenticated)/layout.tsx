import { currentUser } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import React from "react";

interface SettingsParams {
  profile: string;
}

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: SettingsParams;
}) {
  const user = await currentUser();

  if (user!.id != params.profile) return notFound();

  return <main className="h-full w-full">{children}</main>;
}
