import { headers } from "next/headers";

/**
 * 絶対パス取得
 * @returns ホストとプロトコル取得し絶対パス用のURL文字列を返却
 */
const getApiBase = () => {
  // ホストとプロトコル取得
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto") || "http";
  const host = headersData.get("host");
  // 絶対パス
  const apiBase = `${protocol}://${host}`;
  return apiBase;
};

export default getApiBase;
