import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UpdateTask } from "@/lib/validators/task";
import { headers } from "next/headers";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
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

    const createdTask = await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(createdTask), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error.", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
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

    const body = await req.json();
    let taskObj = {
      ...body,
      dueDate: new Date(body.dueDate)
    };
    const { title, description, priority, dueDate } = UpdateTask.parse(taskObj);
    const updatedTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: title ?? task.title,
        description: description ?? task.description,
        priority: priority ?? task.priority,
        dueDate: dueDate ?? task.dueDate,
      },
    });

    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error.", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
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

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error.", { status: 500 });
  }
}
