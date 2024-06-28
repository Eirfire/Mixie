"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { profileEditSchema } from "@/types/zodSchemas/profile";

export default function SignupPage() {
  const form = useForm<z.infer<typeof profileEditSchema>>({
    resolver: zodResolver(profileEditSchema),
  });

  return (
    <div>
      <div className="flex flex-col items-center">
        <Image
          src="/icons/icon_x128.jpg"
          alt="Logo"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full"
        />
        <h1 className="text-step--1">Customize Your Mixie Profile</h1>
      </div>

      <Form {...form}></Form>
    </div>
  );
}
