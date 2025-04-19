import TaskItem from "./TaskItem";

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
  title: string;
  showCompletedStyle?: boolean;
};

export default function TaskList({
  tasks,
  onToggle,
  title,
  showCompletedStyle,
}: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} />
          ))}
        </ul>
      ) : (
        <p>No tasks here.</p>
      )}
    </div>
  );
}