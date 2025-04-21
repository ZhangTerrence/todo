"use client";

import { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

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

  // New input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(0);

  const handleToggle = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const endpoint = task.completed ? `/api/task/uncomplete/${id}` : `/api/task/complete/${id}`;

    try {
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to toggle task");

      // Optimistically update local state
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  useEffect(() => {
    const timers: { [id: string]: NodeJS.Timeout } = {};
    tasks.forEach((task) => {
      if (task.completed) {
        timers[task.id] = setTimeout(() => {
          setTasks((prev) => prev.filter((t) => t.id !== task.id));
        }, 50000);
      }
    });

    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, [tasks]);

  const handleAddTask = async () => {
    if (!title.trim()) return;

    const newTask = {
      title,
      description,
      priority,
      dueDate,
    };

    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const createdTask = await res.json();

      // Add the task returned from the backend to state
      setTasks((prev) => [...prev, createdTask]);

      // Clear form fields
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority(0);
    } catch (err) {
      console.error("Error creating task:", err);
    }

    // Clear fields
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority(0);
  };

  const sortTasksByPriority = (tasks: Task[]) => {
    return tasks.sort((a, b) => (a.priority ?? Number.NEGATIVE_INFINITY) - (b.priority ?? Number.NEGATIVE_INFINITY));
  };

  const pendingTasks = sortTasksByPriority(tasks.filter((task) => !task.completed));
  const MAX_COMPLETED_TASKS = 10;
  const completedTasks = sortTasksByPriority(tasks.filter((t) => t.completed).slice(0, MAX_COMPLETED_TASKS));

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">📝 Your Tasks</h1>
      <TaskInput
        title={title}
        description={description}
        dueDate={dueDate}
        priority={priority}
        onChangeTitle={setTitle}
        onChangeDescription={setDescription}
        onChangeDueDate={setDueDate}
        onChangePriority={setPriority}
        onSubmit={handleAddTask}
      />
      <TaskList tasks={pendingTasks} onToggle={handleToggle} title="⏳ Pending Tasks" />
      <TaskList tasks={completedTasks} onToggle={handleToggle} title="✅ Completed Tasks" />
    </div>
  );
}
