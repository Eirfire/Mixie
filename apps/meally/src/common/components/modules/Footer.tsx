import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="bottom-0 mt-40  flex h-28 w-full flex-col items-center justify-between bg-white px-4 dark:bg-grey print:hidden md:flex-row">
        <div className="flex flex-row items-center justify-center gap-1">
          <Image src="/favicon.ico" alt="Meally Logo" width={60} height={60} />
          <h1 className="text-step1">Meally</h1>
        </div>
        <div className="flex flex-col items-center gap-4 ">
          <div className="flex flex-row items-start  gap-4">
            <Link href="/">Home</Link>
            <Link href="/recipes">Recipe</Link>
            {/* <Link href="/sweet">Sweet</Link>
          <Link href="/savoury">Savoury</Link> */}
          </div>
          <div className="flex flex-row items-start  gap-4">
            <Link href="/info/privacy_policy">Privacy Policy</Link>
            <Link href="/info/terms_service">Terms of Service</Link>
          </div>
        </div>
        <p className="text-step--4">© 2023 Meally. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Footer;