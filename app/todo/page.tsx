"use client";

import { Suspense } from "react";
import Loading from "../loading";
import TodoNewButton from "../components/todo/todo-new-button";
import TodoList from "../components/todo/todo-list";
import { fetchTodos } from "@/utils/supabase-server";
import useStore from "../../store";
import { useSupabase } from "../components/supabase-provider";

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
      <TodoNewButton />
      <Suspense fallback={<Loading />}>
        {/* @ts-ignore*/}
        <TodoList todos={todos} />
      </Suspense>
    </div>
  );
};

export default TodoPage;
