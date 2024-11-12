"use client";

type TodoFilterProps = {
  status: string;
  setStatus: (setStatus: string) => void;
};

const TodoFilter = ({ status, setStatus }: TodoFilterProps) => {
  return (
    <>
      <label htmlFor="status-filter" className="mr-2">
        ステータスで絞り込み:
      </label>
      <select
        id="status-filter"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
      >
        <option value="all">すべて</option>
        <option value="未着手">未着手</option>
        <option value="途中">途中</option>
        <option value="完了">完了</option>
      </select>
    </>
  );
};

export default TodoFilter;
