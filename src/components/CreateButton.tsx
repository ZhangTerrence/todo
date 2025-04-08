"use client";

export default function CreateButton() {
  const create = async () => {
    const response = await fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test Task",
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  return <button onClick={() => create()}>Create</button>;
}
