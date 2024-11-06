"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";

import Link from "next/link";
import useStore from "../../../store";
import Image from "next/image";
import Loading from "../../loading";

import type { TodoListType } from "../../../utils/todo.types";
type PageProps = {
  todo: TodoListType;
};

// TODO詳細
const TodoDetail = ({ todo }: PageProps) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();
  const [myTodo, setMyTodo] = useState(false);
  const [loading, setLoading] = useState(false);

  // TODO削除
  const deleteTodo = async () => {
    setLoading(true);

    // supabaseTODO削除
    const { error } = await supabase.from("todos").delete().eq("id", todo.id);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // トップページに遷移
    router.push(`/`);
    router.refresh();

    setLoading(false);
  };

  // 自分が投稿したTODOのみ、編集削除ボタンを表示
  const renderButton = () => {
    if (myTodo) {
      return (
        <div className="flex justify-end">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex items-center space-x-5">
              <Link href={`/todo/${todo.id}/edit`}>編集</Link>
              <div className="cursor-pointer" onClick={() => deleteTodo()}>
                削除
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  useEffect(() => {
    // 自分が投稿したTODOチェック
    if (user.id === todo.user_id) {
      setMyTodo(true);
    }
  }, [user]);

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex flex-col items-center justify-center mb-5">
        <div className="font-bold text-gray-500">{todo.name}</div>
        <div className="text-sm text-gray-500">
          {format(new Date(todo.created_at), "yyyy/MM/dd HH:mm")}
        </div>
      </div>

      <div className="mb-5">
        <div className="text-center font-bold text-3xl mb-5">{todo.title}</div>
        <div className="leading-relaxed break-words whitespace-pre-wrap">
          {todo.content}
        </div>
      </div>

      {renderButton()}
    </div>
  );
};

export default TodoDetail;
