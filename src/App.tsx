import { useState } from "react";
import type { Todo, AddTodoInput } from "./components/types";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
// import { PageTemplate } from "./PageTemplate";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = (input: AddTodoInput) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: input.text,
      priority: input.priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: false } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div
      // className="max-width[500px]"
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>TypeScript React Todo App</h2>
      <TodoForm onAddTodo={addTodo} />

      {/* Filter Controls */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {(["all", "active", "completed"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              fontWeight: filter === type ? "bold" : "normal",
              textTransform: "capitalize",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Todo List */}
      {filteredTodos.length === 0 ? (
        <p style={{ color: "#888" }}>No tasks found.</p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))
      )}
    </div>
  );
  // return <PageTemplate />;
}

export default App;
