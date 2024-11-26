import { notFound } from "next/navigation";
import TodoEdit from "../../../components/pages/TodoEditPage";
import getApiBase from "@/utils/apibase";

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
  // 絶対パス
  const apiBase = getApiBase();
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
