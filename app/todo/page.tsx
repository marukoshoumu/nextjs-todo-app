"use client";

import { Suspense } from "react";
import Loading from "../loading";
import useStore from "../../store";
import { useSupabase } from "../components/supabase-provider";
import TodoListPage from "../components/pages/TodoListPage";

// メインページ
const TodoPage = async () => {
  const { user } = useStore();
  const getTodo = {
    id: user.id,
  };
  const response = await fetch(`/api/todo?userId=${user.id}`);

  if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.error || "取得に失敗しました。");
    return;
  }
  const todos = await response.json();

  return (
    <div className="h-full">
      <Suspense fallback={<Loading />}>
        {/* @ts-ignore*/}
        <TodoListPage todos={todos} />
      </Suspense>
    </div>
  );
};

export default TodoPage;
