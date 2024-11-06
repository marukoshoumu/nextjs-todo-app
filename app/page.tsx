import { Suspense } from "react";

import BlogList from "./components/blog/blog-list";
import BlogNewButton from "./components/blog/blog-new-button";
import Loading from "./loading";
import TodoNewButton from "./components/todo/todo-new-button";
import TodoList from "./components/todo/todo-list";

// メインページ
const Page = () => {
  return (
    <div className="h-full">
      <BlogNewButton />
      <TodoNewButton />
      {/* 非同期対応 */}
      <Suspense fallback={<Loading />}>
        {/* @ts-ignore*/}
        <BlogList />
      </Suspense>
      <Suspense fallback={<Loading />}>
        {/* @ts-ignore*/}
        <TodoList />
      </Suspense>
    </div>
  );
};

export default Page;
