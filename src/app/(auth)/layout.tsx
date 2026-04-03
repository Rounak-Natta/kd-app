import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
  <div className="hidden md:flex bg-primary text-white items-center justify-center">
    <h2 className="text-3xl font-bold">Kitchen Diaries</h2>
  </div>

  <div className="flex items-center justify-center">
    {children}
  </div>
</div>
  );
}