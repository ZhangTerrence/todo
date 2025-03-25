import LogoutButton from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  return (
    <main className="h-screen w-screen">
      <LogoutButton />
    </main>
  );
}
