export interface TodoListType {
  id: string;
  created_at: string;
  title: string;
  content: string;
  user_id: string;
  status: "未着手" | "途中" | "完了";
  comment: string | null;
}
