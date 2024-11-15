import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase-server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { data: todos, error } = await supabase
    .from("todos")
    .select()
    .eq("user_id", userId!)
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });

  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const supabase = createClient();
  const inserts = await req.json();
  const { error } = await supabase.from("todos").insert(inserts);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Todo insert successfully" });
}
