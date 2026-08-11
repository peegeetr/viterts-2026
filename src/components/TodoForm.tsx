import React, { useState } from "react";
import type { AddTodoInput, Priority } from "./types";

interface ToDoFormProps {
  onAddTodo: (todo: AddTodoInput) => void;
}

export function TodoForm({ onAddTodo }: ToDoFormProps) {
  const [text, setText] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAddTodo({ text: text.trim(), priority });
    setText("");
    setPriority("medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: "16px",
        marginTop: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        style={{ flex: 1, padding: "8px", border: "1px solid gray" }}
      />
      <select
        value={priority}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setPriority(e.target.value as Priority)
        }
        style={{ padding: "8px", border: "1px solid gray" }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        style={{ padding: "8px 16px", border: "1px solid gray" }}
      >
        Add
      </button>
    </form>
  );
}
