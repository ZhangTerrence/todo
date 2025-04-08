import { auth } from "@/lib/auth";
import { getHeaders } from "@better-fetch/fetch";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth.api.getSession({
      headers: getHeaders(),
    });

    if (!session || !session.user) {
      return new Response("Unauthorized.", { status: 401 });
    }

    const { id } = await params;

    if (!id) {
      return new Response("Bad request, task id needed.", { status: 400 });
    }

    const task = await prisma.task.findFirst({
      where: {
        id,
      },
    });
    if (!task) {
      return new Response("Task not found.", { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        completed: false,
      },
    });

    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error.", { status: 500 });
  }
}
