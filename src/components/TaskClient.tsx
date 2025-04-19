"use client";

import { useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useEffect } from "react";

interface Task {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: number | null;
  dueDate: Date | null;
}

export default function TaskClient({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskText, setNewTaskText] = useState("");

  const handleToggle = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  useEffect(() => {
    const timers: { [id: string]: NodeJS.Timeout } = {};
  
    tasks.forEach(task => {
      if (task.completed) {
        timers[task.id] = setTimeout(() => {
          setTasks(prev => prev.filter(t => t.id !== task.id));
        }, 5000); // 5 seconds
      }
    });
  });

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    setTasks(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        userId: "",
        title: newTaskText,
        description: null,
        completed: false,
        priority: null,
        dueDate: null,
      },
    ]);
    setNewTaskText("");
  };

  const pendingTasks = tasks.filter(task => !task.completed);
const MAX_COMPLETED_TASKS = 10;
const completedTasks = tasks
  .filter(t => t.completed)
  .sort((a, b) => Number(b.id) - Number(a.id))
  .slice(0, MAX_COMPLETED_TASKS);

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">📝 Your Tasks</h1>
      <TaskInput
        value={newTaskText}
        onChange={setNewTaskText}
        onSubmit={handleAddTask}
      />
      <TaskList
        tasks={pendingTasks}
        onToggle={handleToggle}
        title="⏳ Pending Tasks"
      />
      <TaskList
        tasks={completedTasks}
        onToggle={handleToggle}
        title="✅ Completed Tasks"
      />
    </div>
  );
}