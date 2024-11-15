"use client";

import React, { useState, useEffect } from "react";
import { TodoItem } from "../organisms/TodoItem";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";
import type { TodoListType } from "../../../utils/todo.types";

type TodoListTemplateProps = {
  todos: TodoListType[];
};

export const TodoListTemplate: React.FC<TodoListTemplateProps> = ({
  todos,
}) => {
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("Asc");
  const [filteredTodos, setFilteredTodos] = useState<TodoListType[]>(todos);

  const timeSort = (a: string, b: string, flg: boolean) => {
    if (flg) return a < b ? 1 : -1;
    return a > b ? 1 : -1;
  };

  useEffect(() => {
    setFilteredTodos(
      status === "all" ? todos : todos.filter((todo) => todo.status === status)
    );
  }, [status, todos]);

  useEffect(() => {
    setFilteredTodos(
      sort === "Asc"
        ? filteredTodos.sort((a: TodoListType, b: TodoListType) =>
            timeSort(a.created_at, b.created_at, true)
          )
        : filteredTodos.sort((a: TodoListType, b: TodoListType) =>
            timeSort(a.created_at, b.created_at, false)
          )
    );
  }, [sort, filteredTodos]);

  return (
    <div>
      <div className="m-5 flex space-x-4 items-center">
        <div className="flex">
          <label htmlFor="status-filter" className="mr-2">
            ステータスで絞り込み:
          </label>
          <Select
            value={status}
            onChange={setStatus}
            options={[
              { value: "all", label: "すべて" },
              { value: "未着手", label: "未着手" },
              { value: "途中", label: "途中" },
              { value: "完了", label: "完了" },
            ]}
          />
        </div>
        <div className="flex">
          <label htmlFor="status-sort" className="mr-2">
            作成日時の昇順／降順:
          </label>
          <Select
            value={sort}
            onChange={setSort}
            options={[
              { value: "Asc", label: "昇順" },
              { value: "Desc", label: "降順" },
            ]}
          />
        </div>
        <div>
          <Button
            href="/todo/new"
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            TODO作成
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};
