import { notFound } from "next/navigation";
import { createClient } from "../../../utils/supabase-server";

import TodoItem from "./todo-item";

// ブログリスト
const TodoList = async () => {
  const supabase = createClient();

  // ブログリスト取得
  const { data: todosData } = await supabase
    .from("todos")
    .select()
    .order("created_at", { ascending: false });

  // ブログリストが見つからない場合
  if (!todosData) return notFound();

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* mapでasync/awaitを使用するためPromise.allを使用 */}
      {await Promise.all(
        todosData.map(async (todoData) => {
          // プロフィール取得
          const { data: userData } = await supabase
            .from("profiles")
            .select()
            .eq("id", todoData.user_id)
            .single();

          // ブログとプロフィールのテーブルを結合
          const todo = {
            id: todoData.id,
            created_at: todoData.created_at,
            title: todoData.title,
            content: todoData.content,
            user_id: todoData.user_id,
            name: userData!.name,
            avatar_url: userData!.avatar_url,
          };

          return <TodoItem key={todo.id} {...todo} />;
        })
      )}
    </div>
  );
};

export default TodoList;
