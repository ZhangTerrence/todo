type Props = {
  title: string;
  description: string;
  dueDate: string; // ISO format
  priority: number;
  onChangeTitle: (val: string) => void;
  onChangeDescription: (val: string) => void;
  onChangeDueDate: (val: string) => void;
  onChangePriority: (val: number) => void;
  onSubmit: () => void;
};

export default function TaskInput({
  title,
  description,
  dueDate,
  priority,
  onChangeTitle,
  onChangeDescription,
  onChangeDueDate,
  onChangePriority,
  onSubmit,
}: Props) {
  return (
    <div className="mb-4 space-y-2">
      <input
        type="text"
        value={title}
        onChange={e => onChangeTitle(e.target.value)}
        placeholder="Title"
        className="border rounded px-3 py-2 w-full"
      />
      <textarea
        value={description}
        onChange={e => onChangeDescription(e.target.value)}
        placeholder="Description"
        className="border rounded px-3 py-2 w-full"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => onChangeDueDate(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <input
        type="number"
        value={priority}
        onChange={e => onChangePriority(Number(e.target.value))}
        placeholder="1"
        className="border rounded px-3 py-2 w-full"
      />
      <button
        onClick={onSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
      >
        Add Task
      </button>
    </div>
  );
}