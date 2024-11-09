export interface TodoListType {
  id: string;
  created_at: string;
  title: string;
  content: string;
  user_id: string;
  status: string | null;
  comment: string | null;
}
