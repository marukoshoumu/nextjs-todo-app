import { notFound } from "next/navigation";
import TodoDetail from "../../components/pages/TodoDetailPage";
import type { TodoListType } from "../../../utils/todo.types";
import { headers } from "next/headers";

type PageProps = {
  params: Promise<{
    todoId: string;
  }>;
};

// Todo詳細
const TodoDetailPage = async ({ params }: PageProps) => {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto") || "http";
  const host = headersData.get("host");
  const apiBase = `${protocol}://${host}`;
  const response = await fetch(`${apiBase}/api/todo/${(await params).todoId}`, {
    method: "GET",
  });
  if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.error || "取得に失敗しました。");
    return;
  }
  const todoData = await response.json();

  // Todoが存在しない場合
  if (!todoData) return notFound();

  // 表示Todo詳細作成
  const todo: TodoListType = {
    id: todoData.id,
    created_at: todoData.created_at,
    title: todoData.title,
    content: todoData.content,
    user_id: todoData.user_id,
    status: todoData.status,
    comment: todoData.comment,
  };

  return <TodoDetail todo={todo} />;
};

export default TodoDetailPage;
