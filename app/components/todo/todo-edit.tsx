"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useSupabase } from "../supabase-provider";

import type { Database } from "../../../utils/database.types";

import Loading from "../../loading";
import useStore from "../../../store";

type Todo = Database["public"]["Tables"]["todos"]["Row"];
type PageProps = {
  todo: Todo;
};

// TODO編集
const TodoEdit = ({ todo }: PageProps) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File>(null!);
  const [loading, setLoading] = useState(false);
  const [myTodo, setMyTodo] = useState(false);

  useEffect(() => {
    // 自分が投稿したTODOチェック
    if (user.id !== todo.user_id) {
      // TODO詳細に遷移
      router.push(`/todo/${todo.id}`);
    } else {
      // 初期値設定
      setTitle(todo.title);
      setContent(todo.content);
      setMyTodo(true);
    }
  }, []);

  // 送信
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (user.id) {
      // TODOをアップデート
      const { error: updateError } = await supabase
        .from("todos")
        .update({
          title,
          content,
        })
        .eq("id", todo.id);

      if (updateError) {
        alert(updateError.message);
        setLoading(false);
        return;
      }

      // TODO詳細に遷移
      router.push(`/todo/${todo.id}`);
      router.refresh();
    }

    setLoading(false);
  };

  // 自分が作成したTODOを表示
  const renderTodo = () => {
    if (myTodo) {
      return (
        <div className="max-w-screen-md mx-auto">
          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <div className="text-sm mb-1">タイトル</div>
              <input
                className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                required
              />
            </div>

            <div className="mb-5">
              <div className="text-sm mb-1">内容</div>
              <textarea
                className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
                id="content"
                placeholder="Content"
                rows={15}
                value={content}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setContent(e.target.value)
                }
                required
              />
            </div>

            <div className="text-center mb-5">
              {loading ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-yellow-500 hover:brightness-110 rounded py-1 px-8"
                >
                  編集
                </button>
              )}
            </div>
          </form>
        </div>
      );
    }
  };

  return <>{renderTodo()}</>;
};

export default TodoEdit;
