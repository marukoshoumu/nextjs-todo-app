"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "../../components/atoms/Button";
import { TodoStatus } from "../../components/molecules/TodoStatus";
import Loading from "../../loading";
import type { TodoListType } from "../../../utils/todo.types";

type TodoDetailPageProps = {
  todo: TodoListType;
};

/**
 * TODO詳細ページ
 * @param {TodoDetailPageProps}todo
 * @returns
 */
const TodoDetailPage: React.FC<TodoDetailPageProps> = ({ todo }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 削除ボタン処理
  const deleteTodo = async () => {
    setLoading(true);

    // TODO削除
    const response = await fetch(`/api/todo/${todo.id}`, { method: "DELETE" });

    // レスポンスチェック
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.error || "削除に失敗しました。");
      setLoading(false);
      return;
    }

    // TODO一覧ページに遷移
    router.push(`/todo`);
    router.refresh();

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg mt-8">
      {/** タイトル */}
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{todo.title}</h1>
      {/** 作成日 */}
      <div className="text-sm text-gray-500 mb-4">
        作成日：{format(new Date(todo.created_at), "yyyy/MM/dd HH:mm")}
      </div>

      {/** 内容 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">内容</h2>
        <p className="text-gray-600 mt-2">{todo.content}</p>
      </div>

      {/** コメント */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">コメント</h2>
        <p className="text-gray-600 mt-2">{todo.comment}</p>
      </div>

      {/** ステータス */}
      <div className="mt-4">
        <TodoStatus status={todo.status!} />
      </div>

      {/** 編集・削除ボタン */}
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
