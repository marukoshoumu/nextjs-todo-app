"use client";

import { format } from "date-fns";
import type { TodoListType } from "../../../utils/todo.types";

import Link from "next/link";

// ブログアイテム
const TodoItem = (todo: TodoListType) => {
  const MAX_LENGTH = 55;
  let content = todo.content.replace(/\r?\n/g, "");

  // 文字数制限
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
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              todo.status === "完了"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {todo.status}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default TodoItem;
