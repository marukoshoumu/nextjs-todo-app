import { notFound } from "next/navigation";
import TodoEdit from "../../../components/pages/TodoEditPage";
import { headers } from "next/headers";

type PageProps = {
  params: Promise<{
    todoId: string;
  }>;
};

/**
 * TODO編集ページ
 * @param {PageProps}params todoId
 * @returns
 */
const TodoEditPage = async ({ params }: PageProps) => {
  // ホストとプロトコル取得
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto") || "http";
  const host = headersData.get("host");
  // 絶対パス
  const apiBase = `${protocol}://${host}`;
  // Todo単一行検索
  const response = await fetch(`${apiBase}/api/todo/${(await params).todoId}`, {
    method: "GET",
  });
  // レスポンスチェック
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
