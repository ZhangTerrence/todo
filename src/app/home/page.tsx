import LogoutButton from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import CreateButton from "@/components/CreateButton";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return redirect("/login");
  }

  const user = session.user;
  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
  });
  console.log(tasks);

  return (
    <main className="h-screen w-screen">
      <LogoutButton />
      <CreateButton />
    </main>
  );
}
