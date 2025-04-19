type Props = {
    value: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
  };
  
  export default function TaskInput({ value, onChange, onSubmit }: Props) {
    return (
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="New task"
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={onSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    );
  }