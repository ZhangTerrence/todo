import LogoutButton from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import TaskClient from "@/components/TaskClient"; // new client component

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return redirect("/login");
  }

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
  });

  return (
    <main className="h-screen w-screen">
      <LogoutButton />
      <TaskClient tasks={tasks} />
    </main>
  );
}