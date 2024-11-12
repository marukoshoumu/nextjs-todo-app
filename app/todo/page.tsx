"use client";

import { Suspense } from "react";
import Loading from "../loading";
import useStore from "../../store";
import { useSupabase } from "../components/supabase-provider";
import TodoListPage from "../components/pages/TodoListPage";

// メインページ
const TodoPage = async () => {
  const { user } = useStore();
  const { supabase } = useSupabase();
  const { data: todos, error } = await supabase
    .from("todos")
    .select()
    .eq("user_id", user.id!)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error);
    return [];
  }

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
