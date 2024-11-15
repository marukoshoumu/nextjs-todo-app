import { notFound } from "next/navigation";
import TodoEdit from "../../../components/pages/TodoEditPage";
import { headers } from "next/headers";

type PageProps = {
  params: Promise<{
    todoId: string;
  }>;
};

// TODO編集ページ
const TodoEditPage = async ({ params }: PageProps) => {
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
  const todo = await response.json();

  // TODOが存在しない場合
  if (!todo) return notFound();

  return <TodoEdit todo={todo} />;
};

export default TodoEditPage;
