type TodoStatusProps = {
  status: "未着手" | "途中" | "完了";
};

/**
 * TODOステータス
 * @param {TodoStatusProps}status
 * @returns
 */
export const TodoStatus: React.FC<TodoStatusProps> = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === "完了"
          ? "bg-green-100 text-green-600"
          : "bg-yellow-100 text-yellow-600"
      }`}
    >
      {status}
    </span>
  );
};
