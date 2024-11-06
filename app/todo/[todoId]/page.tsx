import { notFound } from "next/navigation";
import { createClient } from "../../../utils/supabase-server";
import type { TodoListType } from "../../../utils/todo.types";

import TodoDetail from "../../components/todo/todo-detail";

type PageProps = {
  params: {
    todoId: string;
  };
};

// Todo詳細
const TodoDetailPage = async ({ params }: PageProps) => {
  const supabase = createClient();

  // Todo詳細取得
  const { data: todoData } = await supabase
    .from("todos")
    .select("*")
    .eq("id", params.todoId)
    .single();

  // Todoが存在しない場合
  if (!todoData) return notFound();

  // プロフィール取得
  const { data: profileData } = await supabase
    .from("profiles")
    .select()
    .eq("id", todoData.user_id)
    .single();

  // 表示Todo詳細作成
  const todo: TodoListType = {
    id: todoData.id,
    created_at: todoData.created_at,
    title: todoData.title,
    content: todoData.content,
    user_id: todoData.user_id,
    name: profileData!.name,
  };

  return <TodoDetail todo={todo} />;
};

export default TodoDetailPage;
