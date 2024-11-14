import { notFound } from "next/navigation";
import { createClient } from "../../../../utils/supabase-server";

import TodoEdit from "../../../components/pages/TodoEditPage";

type PageProps = {
  params: {
    todoId: string;
  };
};

// TODO編集ページ
const TodoEditPage = async ({ params }: PageProps) => {
  const response = await fetch(`/api/todo/${params.todoId}`, { method: "GET" });

  if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.error || "取得に失敗しました。");
    return;
  }
  const todo = await response.json();

  // const supabase = createClient();

  // // TODO詳細取得
  // const { data: todo } = await supabase
  //   .from("todos")
  //   .select()
  //   .eq("id", params.todoId)
  //   .single();

  // TODOが存在しない場合
  if (!todo) return notFound();

  return <TodoEdit todo={todo} />;
};

export default TodoEditPage;
