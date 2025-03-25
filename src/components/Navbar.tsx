"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex p-4 justify-between">
      <Link href="/">Landing</Link>
      <div className="space-x-2">
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </nav>
  );
}
