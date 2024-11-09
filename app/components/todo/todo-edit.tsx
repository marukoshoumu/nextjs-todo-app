"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";
import type { Database } from "../../../utils/database.types";
import Loading from "../../loading";
import useStore from "../../../store";

type Todo = Database["public"]["Tables"]["todos"]["Row"];
type PageProps = {
  todo: Todo;
};

const TodoEdit = ({ todo }: PageProps) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("未着手");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [myTodo, setMyTodo] = useState(false);

  useEffect(() => {
    if (user.id !== todo.user_id) {
      router.push(`/todo/${todo.id}`);
    } else {
      setTitle(todo.title);
      setContent(todo.content);
      setStatus(todo.status || "未着手");
      setComment(todo.comment || "");
      setMyTodo(true);
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
        setLoading(false);
        return;
      }

      router.push(`/todo`);
      router.refresh();
    }

    setLoading(false);
  };

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

            <div className="mb-5">
              <div className="text-sm mb-1">ステータス</div>
              <select
                className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
                id="status"
                value={status}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setStatus(e.target.value)
                }
              >
                <option value="未着手">未着手</option>
                <option value="着手中">着手中</option>
                <option value="完了">完了</option>
              </select>
            </div>

            <div className="mb-5">
              <div className="text-sm mb-1">コメント</div>
              <textarea
                className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
                id="comment"
                placeholder="Comment"
                rows={5}
                value={comment}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setComment(e.target.value)
                }
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
