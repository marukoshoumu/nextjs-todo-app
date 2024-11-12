"use client";

type TodoSortProps = {
  sort: string;
  setSort: (setStatus: string) => void;
};

const TodoSort = ({ sort, setSort }: TodoSortProps) => {
  return (
    <>
      <label htmlFor="status-sort" className="mr-2">
        作成日時の昇順／降順:
      </label>
      <select
        id="status-sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
      >
        <option value="Asc">昇順</option>
        <option value="Desc">降順</option>
      </select>
    </>
  );
};

export default TodoSort;
