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
    <div className="break-words">
      <Link href={`todo/${todo.id}`}>
        <div className="text-gray-500 text-sm">
          作成日：{format(new Date(todo.created_at), "yyyy/MM/dd HH:mm")}
        </div>
        <div className="font-bold text-xl">{todo.title}</div>
        <div className="mb-3 text-gray-500">{content}</div>
        <div className="mb-3 text-gray-500">ステータス：{todo.status}</div>
      </Link>
    </div>
  );
};

export default TodoItem;
