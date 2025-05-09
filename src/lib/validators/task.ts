import { z } from "zod";

export const CreateTask = z.object({
  title: z.string(),
  description: z.string().optional(),
  priority: z.number().optional(),
  dueDate: z.preprocess(
    (val) => (typeof val === "string" && val ? new Date(val) : null),
    z.date().nullable()
  ),
});

export type CreateTaskType = z.infer<typeof CreateTask>;

export const UpdateTask = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  priority: z.number().optional(),
  dueDate: z.date().optional(),
});

export type UpdateTaskType = z.infer<typeof UpdateTask>;
