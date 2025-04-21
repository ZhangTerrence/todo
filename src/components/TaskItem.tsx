import { useState } from "react";
import { useRouter } from "next/navigation";
import { describe } from "node:test";


type Task = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: number | null;
  dueDate: Date | null;
};


export async function onUpdate(task: Task): Promise<Task> {
  const priority = new Number(task.priority);
  const response = await fetch(`/api/task/${task.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      priority: priority,
      dueDate: task.dueDate
    }),
  });

  const updated = await response.json();
  console.log("Updated:", updated);
  return updated;
}



type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(e.target);
    setEditedTask({
      ...editedTask,
      [name]: name === "dueDate" ? new Date(value) : value,
    });
  };

  const handleSave = async () => {
    await onUpdate(editedTask);
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col gap-1 border p-3 rounded mb-2 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mr-2"
          />
          {isEditing ? (
            <input
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="font-semibold border rounded px-1 py-0.5"
            />
          ) : (
            <span className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
              {editedTask.title}
            </span>
          )}
        </div>
        <div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-sm text-blue-500 hover:underline"> 
          {isEditing ? "Save" : "Edit"}
        </button>
        <span> </span>
        <button 
          onClick={() => onDelete(task.id)} 
          className="text-sm text-blue-500 hover:underline">Delete</button>
        </div>
        
      </div>

      {isEditing ? (
        <textarea
          name="description"
          value={editedTask.description ?? ""}
          onChange={handleChange}
          className="text-sm border rounded px-1 py-0.5 ml-6"
        />
      ) : (
        task.description && (
          <p className="text-sm text-gray-600 ml-6">{editedTask.description}</p>
        )
      )}

      {isEditing ? (
        <input
          type="date"
          name="dueDate"
          value={
            editedTask.dueDate
              ? new Date(editedTask.dueDate).toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
          className="text-xs border rounded px-1 py-0.5 ml-6"
        />
      ) : (
        editedTask.dueDate && (
          <p className="text-xs text-gray-500 ml-6">
            Due: {new Date(editedTask.dueDate).toLocaleDateString()}
          </p>
        )
      )}

      {isEditing ? (
        <input
          name="priority"
          type="number"
          value={editedTask.priority ?? ""}
          onChange={handleChange}
          className="text-sm border rounded px-1 py-0.5 ml-6"
        />
      ) : (
        1 && (
          <p className="text-sm text-gray-600 ml-6">Priority: {editedTask.priority}</p>
        )
      )}
    </li>
  );
}