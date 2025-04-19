type Task = {
    id: string;
    userId: string;
    title: string;
    description: string | null;
    completed: boolean;
    priority: number | null;
    dueDate: Date | null;
  }; // or define Task inline if not using shared types

type Props = {
  task: Task;
  onToggle: (id: string) => void;
};

export default function TaskItem({ task, onToggle }: Props) {
  return (
    <li className="flex flex-col gap-1 border p-3 rounded mb-2 shadow-sm">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-2"
        />
        <span className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
          {task.title}
        </span>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 ml-6">{task.description}</p>
      )}
      {task.dueDate && (
        <p className="text-xs text-gray-500 ml-6">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </li>
  );
}