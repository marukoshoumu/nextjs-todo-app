import { Suspense } from "react";
import Loading from "../loading";
import TodoListPage from "../components/pages/TodoListPage";
import { createClient } from "@/utils/supabase-server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

/**
 * メインページ
 * @returns
 */
const TodoPage = async () => {
  // セッション取得
  const { data, error } = await createClient().auth.getSession();
  if (error) {
    console.error(error.message);
    return null;
  }

  const { session } = data;
  console.log("session", session);
  let todos = [];
  try {
    // ホストとプロトコルを取得
    const headersData = headers();
    const protocol = headersData.get("x-forwarded-proto") || "http";
    const host = headersData.get("host");
    // 絶対パス
    const apiBase = `${protocol}://${host}`;
    // TODO単一行検索
    const response = await fetch(
      `${apiBase}/api/todo?userId=${session?.user.id}`
    );

    // レスポンスチェック
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData.error);
      return;
    }
    todos = await response.json();
  } catch (error) {
    console.error(error);
    return;
  }

  return (
    <div className="h-full">
      <Suspense fallback={<Loading />}>
        <TodoListPage todos={todos} />
      </Suspense>
    </div>
  );
};

export default TodoPage;
