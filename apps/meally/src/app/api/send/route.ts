import VerificationEmail from "@/src/common/components/email/VerificationEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";
import { env } from "@/env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST() {
  try {
    console.log("Snet to server");
    const data = await resend.emails.send({
      from: "cook@meally.com.au",
      to: ["jacob35422@gmail.com"],
      subject: "Your login code for Meally",
      react: VerificationEmail({
        email: "jacob35422@gmail.com",
        token: "test",
      }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
