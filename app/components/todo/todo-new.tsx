"use client";

import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";
import useStore from "../../../store";
import TodoForm from "./todo-form";

const TodoNew = () => {
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
      const { error: insertError } = await supabase.from("todos").insert({
        title: title,
        content: content,
        status: status,
        comment: comment,
        user_id: user.id,
      });

      if (insertError) {
        alert(insertError.message);
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

export default TodoNew;
