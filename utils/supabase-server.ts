import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./database.types";

export const createClient = () =>
  createServerComponentClient<Database>({
    cookies: () => cookies(),
  });

export const fetchTodos = async (userId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: todos, error } = await supabase
    .from("todos")
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error);
    return [];
  }

  return todos;
};
