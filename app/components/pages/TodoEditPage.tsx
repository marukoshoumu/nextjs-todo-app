"use client";

import { useRouter } from "next/navigation";
import type { Database } from "../../../utils/database.types";
import useStore from "../../../store";
import { TodoForm } from "../organisms/TodoForm";

type Todo = Database["public"]["Tables"]["todos"]["Row"];
type PageProps = {
  todo: Todo;
};

const TodoEditPage = ({ todo }: PageProps) => {
  const router = useRouter();
  const { user } = useStore();

  const onSubmit = async (
    title: string,
    content: string,
    status: string,
    comment: string
  ) => {
    if (user.id) {
      const updatedTodo = {
        title: title,
        content: content,
        status: status,
        comment: comment,
      };
      const response = await fetch(`/api/todo/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "更新に失敗しました。");
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
