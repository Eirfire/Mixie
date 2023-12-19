import React from "react";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="h-full w-full">
      <div className="m-auto flex max-w-md flex-col items-center gap-3 rounded-3xl bg-white p-3 text-center dark:bg-grey">
        {children}
      </div>
    </main>
  );
}
