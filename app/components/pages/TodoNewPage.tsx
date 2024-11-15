"use client";

import { useRouter } from "next/navigation";
import useStore from "../../../store";
import { TodoForm } from "../organisms/TodoForm";

const TodoNewPage = () => {
  const router = useRouter();
  const { user } = useStore();

  const onSubmit = async (
    title: string,
    content: string,
    status: string,
    comment: string
  ) => {
    if (user.id) {
      const insertTodo = {
        title: title,
        content: content,
        status: status,
        comment: comment,
        user_id: user.id,
      };
      const response = await fetch(`/api/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(insertTodo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "登録に失敗しました。");
        return;
      }

      router.push("/todo");
      router.refresh();
    }
  };
  const initialData = {
    title: "",
    content: "",
    status: "未着手",
    comment: "",
  };
  return (
    <TodoForm
      buttonName={"作成"}
      onSubmit={onSubmit}
      initialData={initialData}
    />
  );
};

export default TodoNewPage;
