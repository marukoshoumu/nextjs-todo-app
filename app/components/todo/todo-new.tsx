"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";
import useStore from "../../../store";
import Loading from "../../loading";

const TodoNew = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();
  const titleRef = useRef<HTMLInputElement>(null!);
  const contentRef = useRef<HTMLTextAreaElement>(null!);
  const [status, setStatus] = useState("未着手");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (user.id) {
      const { error: insertError } = await supabase.from("todos").insert({
        title: titleRef.current.value,
        content: contentRef.current.value,
        status: status,
        comment: comment,
        user_id: user.id,
      });

      if (insertError) {
        alert(insertError.message);
        setLoading(false);
        return;
      }

      router.push("/todo");
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <div className="text-sm mb-1">タイトル</div>
          <input
            className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
            ref={titleRef}
            type="text"
            id="title"
            placeholder="Title"
            required
          />
        </div>

        <div className="mb-5">
          <div className="text-sm mb-1">内容</div>
          <textarea
            className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
            ref={contentRef}
            id="content"
            placeholder="Content"
            rows={15}
            required
          />
        </div>

        <div className="mb-5">
          <div className="text-sm mb-1">ステータス</div>
          <select
            className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            onChange={(e) => setComment(e.target.value)}
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
              作成
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoNew;
