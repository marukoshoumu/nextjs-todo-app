"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";
import Link from "next/link";
import useStore from "../../../store";
import Loading from "../../loading";

import type { TodoListType } from "../../../utils/todo.types";
type PageProps = {
  todo: TodoListType;
};

const TodoDetail = ({ todo }: PageProps) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteTodo = async () => {
    setLoading(true);

    const { error } = await supabase.from("todos").delete().eq("id", todo.id);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.push(`/todo`);
    router.refresh();

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{todo.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        作成日：{format(new Date(todo.created_at), "yyyy/MM/dd HH:mm")}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">内容</h2>
        <p className="text-gray-600 mt-2">{todo.content}</p>
      </div>

      {todo.comment && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">コメント</h2>
          <p className="text-gray-600 mt-2">{todo.comment}</p>
        </div>
      )}

      <div className="mt-4">
        <span
          className={`inline-block px-4 py-2 rounded-full text-xs font-semibold ${
            todo.status === "完了"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {todo.status}
        </span>
      </div>

      <div className="flex justify-end">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex items-center space-x-5">
            <Link
              href={`/todo/${todo.id}/edit`}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            >
              編集
            </Link>
            <div
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
              onClick={() => deleteTodo()}
            >
              削除
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDetail;
