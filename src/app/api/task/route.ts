import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateTask } from "@/lib/validators/task";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return new Response("Unauthorized.", { status: 401 });
    }

    const body = await req.json();
    const { title, description, priority, dueDate } = CreateTask.parse(body);
   

    const task = await prisma.task.create({
      data: {
        title,
        description: description ?? null,
        priority: priority ?? null,
        dueDate,
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error.", { status: 500 });
  }
}
