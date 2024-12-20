"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useStore from "../../store";
import { createClient } from "@/utils/supabase-client";

/**
 * ユーザーがログインまたはログアウトするたびに新しいセッションを取得する
 * @param {string}serverAccessToken
 * @returns
 */
const SupabaseListener = ({
  serverAccessToken,
}: {
  serverAccessToken?: string;
}) => {
  const router = useRouter();
  const { setUser } = useStore();
  const supabase = createClient();

  useEffect(() => {
    // セッション情報取得
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        // ユーザーIDにとメールアドレスを状態管理に設定
        setUser({
          id: data.session.user.id,
          email: data.session.user.email,
        });
      }
    };
    // リフレッシュ時にセッション情報取得
    getSession();

    // ログイン、ログアウトした時に認証状態を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser({ id: session?.user.id, email: session?.user.email });

      // アクセストークンチェック
      if (session?.access_token !== serverAccessToken) {
        // キャッシュクリア
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, router, setUser, supabase.auth]);

  return null;
};

export default SupabaseListener;
