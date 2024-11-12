"use client";

import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";
import type { Database } from "../../../utils/database.types";
import useStore from "../../../store";
import { TodoForm } from "../organisms/TodoForm";

type Todo = Database["public"]["Tables"]["todos"]["Row"];
type PageProps = {
  todo: Todo;
};

const TodoEditPage = ({ todo }: PageProps) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();

  const onSubmit = async (
    title: string,
    content: string,
    status: string,
    comment: string
  ) => {
    if (user.id) {
      const { error: updateError } = await supabase
        .from("todos")
        .update({
          title,
          content,
          status,
          comment,
        })
        .eq("id", todo.id);

      if (updateError) {
        alert(updateError.message);
        return;
      }

      router.push(`/todo`);
      router.refresh();
    }
  };
  const initialData = {
    title: todo.title || "",
    content: todo.content || "",
    status: todo.status || "未着手",
    comment: todo.comment || "",
  };

  return (
    <TodoForm
      buttonName={"編集"}
      onSubmit={onSubmit}
      initialData={initialData}
    />
  );
};

export default TodoEditPage;
