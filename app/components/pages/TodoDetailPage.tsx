"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";
import { format } from "date-fns";
import { Button } from "../../components/atoms/Button";
import { TodoStatus } from "../../components/molecules/TodoStatus";
import Loading from "../../loading";
import type { TodoListType } from "../../../utils/todo.types";

type TodoDetailPageProps = {
  todo: TodoListType;
};

const TodoDetailPage: React.FC<TodoDetailPageProps> = ({ todo }) => {
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

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">コメント</h2>
        <p className="text-gray-600 mt-2">{todo.comment}</p>
      </div>

      <div className="mt-4">
        <TodoStatus status={todo.status!} />
      </div>

      <div className="flex justify-end mt-6">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex items-center space-x-5">
            <Button
              href={`/todo/${todo.id}/edit`}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              編集
            </Button>
            <Button
              onClick={deleteTodo}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              削除
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDetailPage;
