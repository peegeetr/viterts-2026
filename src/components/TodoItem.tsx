import type { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        marginBottom: "8px",
        backgroundColor: todo.completed ? "#f0f0f0" : "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.text}
        </span>
        <span
          style={{
            fontSize: "12px",
            padding: "2px 6px",
            borderRadius: "4px",
            backgroundColor:
              todo.priority === "high"
                ? "#ff4d4f"
                : todo.priority === "medium"
                  ? "#ffa940"
                  : "#73d13d",
            color: "#fff",
          }}
        >
          {todo.priority}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          color: "red",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
      >
        ✕
      </button>
    </div>
  );
}
