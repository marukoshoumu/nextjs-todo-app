import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { TodoStatus } from "../molecules/TodoStatus";
import type { TodoListType } from "../../../utils/todo.types";

export const TodoItem: React.FC<TodoListType> = (todo) => {
  const MAX_LENGTH = 55;
  let content = todo.content.replace(/\r?\n/g, "");

  if (content.length > MAX_LENGTH) {
    content = content.substring(0, MAX_LENGTH) + "...";
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <Link href={`todo/${todo.id}`}>
        <div className="text-sm text-gray-500">
          作成日時：{format(new Date(todo.created_at), "yyyy/MM/dd HH:mm")}
        </div>
        <div className="text-xl font-semibold text-blue-600">{todo.title}</div>
        <div className="text-gray-600 mt-2">{content}</div>
        <div className="flex justify-between items-center mt-4">
          <TodoStatus status={todo.status!} />
        </div>
      </Link>
    </div>
  );
};
