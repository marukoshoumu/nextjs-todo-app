// todo-list.tsx
"use client";

import TodoItem from "./todo-item";
import TodoFilter from "./todo-filter";
import { useState, useEffect } from "react";

type Todo = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  user_id: string;
  status: string;
  comment: string | null;
};

type Props = {
  todos: Todo[];
};

const TodoList = ({ todos }: Props) => {
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    setFilteredTodos(
      status === "all" ? todos : todos.filter((todo) => todo.status === status)
    );
  }, [status, todos]);

  return (
    <div>
      <TodoFilter status={status} setStatus={setStatus} />
      <div className="grid grid-cols-3 gap-5">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
