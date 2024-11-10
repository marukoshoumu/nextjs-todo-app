// TodoForm.tsx
import Loading from "@/app/loading";
import React, { FormEvent, useState } from "react";

interface todoFormProp {
  buttonName: string;
  onSubmit: (
    title: string,
    content: string,
    status: string,
    comment: string
  ) => Promise<void>;
  initialData: {
    title: string;
    content: string;
    status: string;
    comment: string;
  };
}

const TodoForm = ({ buttonName, onSubmit, initialData }: todoFormProp) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [status, setStatus] = useState(initialData.status || "未着手");
  const [comment, setComment] = useState(initialData.comment || "");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (input: string) => {
    setTitle(input);
    setTitleError(
      input.length > 50 ? "タイトルは50文字以内で入力してください。" : ""
    );
  };

  const handleContentChange = (input: string) => {
    setContent(input);
    setContentError(
      input.length > 100 ? "内容は100文字以内で入力してください。" : ""
    );
  };

  const handleCommentChange = (input: string) => {
    setComment(input);
    setCommentError(
      input.length > 200 ? "コメントは200文字以内で入力してください。" : ""
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titleError && !contentError && !commentError) {
      setLoading(true);
      onSubmit(title, content, status, comment);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Todo {buttonName}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          タイトル
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          maxLength={50}
          className={`mt-1 px-4 py-2 border ${
            titleError ? "border-red-500" : "border-gray-300"
          } rounded-md focus:ring focus:ring-opacity-50 w-full`}
          placeholder="タイトルを入力"
          required
        />
        {titleError && (
          <p className="text-red-500 text-sm mt-1">{titleError}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">内容</label>
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          maxLength={100}
          className={`mt-1 px-4 py-2 border ${
            contentError ? "border-red-500" : "border-gray-300"
          } rounded-md focus:ring focus:ring-opacity-50 w-full`}
          placeholder="内容を入力"
          rows={4}
          required
        />
        {contentError && (
          <p className="text-red-500 text-sm mt-1">{contentError}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          ステータス
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 w-full`}
          required
        >
          <option value="未着手">未着手</option>
          <option value="途中">途中</option>
          <option value="完了">完了</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          コメント
        </label>
        <textarea
          value={comment}
          onChange={(e) => handleCommentChange(e.target.value)}
          maxLength={200}
          className={`mt-1 px-4 py-2 border ${
            commentError ? "border-red-500" : "border-gray-300"
          } rounded-md focus:ring focus:ring-opacity-50 w-full`}
          placeholder="コメントを入力"
          rows={3}
        />
        {commentError && (
          <p className="text-red-500 text-sm mt-1">{commentError}</p>
        )}
      </div>

      {loading ? (
        <Loading />
      ) : (
        <button
          type="submit"
          disabled={!!(titleError || contentError || commentError)}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50"
        >
          {buttonName}
        </button>
      )}
    </form>
  );
};

export default TodoForm;
