"use client";

import { useRef, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Loading from "../../loading";
import supabase from "@/utils/supabase-main";

/**
 * サインアップ
 * @returns
 */
const Singup = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // 送信
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // supabaseサインアップ
    const { data, error: signupError } = await supabase.auth.signUp({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    });

    if (signupError) {
      alert(signupError.message);
      setLoading(false);
      return;
    }

    // プロフィールの名前を更新
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ name: nameRef.current!.value })
      .eq("email", emailRef.current!.value);

    if (updateError) {
      alert(updateError.message);
      setLoading(false);
      return;
    }

    // TODO一覧ページに遷移
    router.push("/todo");

    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={onSubmit}>
        {/** 名前 */}
        <div className="mb-5">
          <div className="text-sm mb-1">名前</div>
          <input
            className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
            ref={nameRef}
            type="text"
            id="name"
            placeholder="Name"
            required
          />
        </div>

        {/** メールアドレス */}
        <div className="mb-5">
          <div className="text-sm mb-1">メールアドレス</div>
          <input
            className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>

        {/** パスワード */}
        <div className="mb-5">
          <div className="text-sm mb-1">パスワード</div>
          <input
            className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
            ref={passwordRef}
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        {/** サインアップ */}
        <div className="text-center mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="w-full text-white bg-yellow-500 hover:brightness-110 rounded py-1 px-8"
            >
              サインアップ
            </button>
          )}
        </div>
      </form>

      {/** ログイン */}
      <div className="text-center">アカウントをお持ちですか？</div>
      <div className="text-center">
        <Link href="/auth/login" className="cursor-pointer font-bold">
          ログイン
        </Link>
      </div>
    </div>
  );
};

export default Singup;
