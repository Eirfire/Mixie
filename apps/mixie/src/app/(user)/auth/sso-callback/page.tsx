import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  console.log('Fired');
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom OAuth flow
  return (
    <AuthenticateWithRedirectCallback afterSignInUrl={"/"} redirectUrl={"/"}  />
  );
}
