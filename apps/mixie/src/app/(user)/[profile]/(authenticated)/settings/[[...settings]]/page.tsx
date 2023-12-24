"use client";

import { UserProfile } from "@clerk/nextjs";
import { env } from "@/env.mjs";
import { Button } from "@/src/common/components/ui/button";
import toast from "react-hot-toast";
import { User } from "@/src/server/db/types";
import { userSchema } from "@/src/server/db/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UserRound, Pencil, Printer } from "lucide-react";

const Profile = dynamic(() => import("@components/elements/Settings/Profile"));
const Customization = dynamic(
  () => import("@components/elements/Settings/Customization")
);
const Account = dynamic(() => import("@components/elements/Settings/Account"));

const UserProfilePage = () => (
  <UserProfile path="/settings" routing="path">
    {/* <UserProfile.Page
      label="Profile"
      labelIcon={<UserRound />}
      url="custom-page"
    >
      <Profile />
    </UserProfile.Page> */}
    <UserProfile.Page
      label="Customization"
      labelIcon={<Pencil />}
      url="customization"
    >
      <Customization />
    </UserProfile.Page>
    <UserProfile.Page label="Account" labelIcon={<Printer />} url="account">
      <Account />
    </UserProfile.Page>
  </UserProfile>
);

export default UserProfilePage;
