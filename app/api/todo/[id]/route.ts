import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase-server";

/**
 * TODO単一行検索
 * @param {NextRequest}req
 * @param {string}id
 * @returns パラメータのIDに紐づくTODOテーブルデータ
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", (await params).id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });

  return NextResponse.json(data);
}

/**
 * TODO更新
 * @param {NextRequest}req
 * @param {string}id
 * @returns 更新したTODOデータ
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient();
  const updates = await req.json();
  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", (await params).id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}

/**
 * TODO削除
 * @param {NextRequest}req
 * @param {string}id
 * @returns 削除処理時のメッセージ
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", (await params).id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Todo deleted successfully" });
}
