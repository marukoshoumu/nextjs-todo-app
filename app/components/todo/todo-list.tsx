// todo-list.tsx
"use client";

import TodoItem from "./todo-item";
import TodoFilter from "./todo-filter";
import { useState, useEffect } from "react";
import TodoSort from "./todo-sort";

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
  const [sort, setSort] = useState("Asc");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  const timeSort = (a: string, b: string, flg: boolean) => {
    if (flg) return a > b ? 1 : -1;
    return a < b ? 1 : -1;
  };

  useEffect(() => {
    setFilteredTodos(
      status === "all" ? todos : todos.filter((todo) => todo.status === status)
    );
  }, [status, todos]);

  useEffect(() => {
    setFilteredTodos(
      sort === "Asc"
        ? todos.sort((a: Todo, b: Todo) =>
            timeSort(a.created_at, b.created_at, true)
          )
        : todos.sort((a: Todo, b: Todo) =>
            timeSort(a.created_at, b.created_at, false)
          )
    );
  }, [sort, filteredTodos]);

  return (
    <div>
      <div className="m-5">
        <TodoFilter status={status} setStatus={setStatus} />
        <TodoSort sort={sort} setSort={setSort} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
