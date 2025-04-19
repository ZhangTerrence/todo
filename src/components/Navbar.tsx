"use client";

import Link from "next/link";
import Button from '@mui/material/Button'


export default function Navbar() {
  return (
    <nav className="flex p-4 justify-between">
      <Button color="inherit" href="/">Home</Button>
      <div className="space-x-2">
        {/* <Link href="/login">Login</Link> */}
        <Button color="inherit" href="/login">Login</Button>
        <Button color="inherit" href="/register">Register</Button>
        {/* <Link href="/register">Register</Link> */}
      </div>
    </nav>
  );
}

