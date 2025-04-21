import TaskItem from "./TaskItem";
import React, { useState } from "react";
import { onUpdate } from "./TaskItem";

interface Task {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: number | null;
  dueDate: Date | null;
}



type Props = {
  tasks: Task[];
  onToggle: (id: string) => void; // ✅ updated from number to string
  onDelete: (id: string) => void;
  // handleUpdate: (task: Task) => Promise<void>;
  title: string;
  showCompletedStyle?: boolean;
};





export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  title,
  showCompletedStyle,
}: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete}/>
          ))}
        </ul>
      ) : (
        <p>No tasks here.</p>
      )}
    </div>
  );
}