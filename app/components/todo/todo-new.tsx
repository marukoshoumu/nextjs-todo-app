"use client";

import { FormEvent, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";

import useStore from "../../../store";
import Loading from "../../loading";

// TODO新規作成
const TodoNew = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();
  const titleRef = useRef<HTMLInputElement>(null!);
  const contentRef = useRef<HTMLTextAreaElement>(null!);
  const [loading, setLoading] = useState(false);

  // 送信
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (user.id) {
      // TODOデータを新規作成
      const { error: insertError } = await supabase.from("todos").insert({
        title: titleRef.current.value,
        content: contentRef.current.value,
        user_id: user.id,
      });

      if (insertError) {
        alert(insertError.message);
        setLoading(false);
        return;
      }

      // トップページに遷移
      router.push("/");
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
