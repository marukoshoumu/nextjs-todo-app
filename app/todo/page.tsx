import { Suspense } from "react";
import Loading from "../loading";
import TodoListPage from "../components/pages/TodoListPage";
import { createClient } from "@/utils/supabase-server";

export const dynamic = "force-dynamic";

// メインページ
const TodoPage = async () => {
  const { data, error } = await createClient().auth.getSession();
  if (error) {
    console.error(error.message);
    return null;
  }

  const { session } = data;
  console.log("session", session);
  let todos = [];
  try {
    const response = await fetch(
      `http://localhost:3000/api/todo?userId=${session?.user.id}`
    );

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
