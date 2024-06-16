import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import React from "react";

const AdminPage = async () => {
  const user = await getUser();
  const supabase = createClient();

  if (!user) return <div>You are not an admin</div>;

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  if (userProfile && userProfile.user_role !== "admin") {
    return <div>Your role is not an admin</div>;
  }

  return <div>AdminPage</div>;
};

export default AdminPage;
