import React, { FormEvent, useState } from 'react'
import { FormField } from '../molecules/FormField'
import { Select } from '../atoms/Select'
import { Button } from '../atoms/Button'
import Loading from '@/app/loading'

interface TodoFormProps {
  buttonName: string
  onSubmit: (title: string, content: string, status: string, comment: string) => Promise<void>
  initialData: {
    title: string
    content: string
    status: string
    comment: string
  }
}

export const TodoForm: React.FC<TodoFormProps> = ({ buttonName, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData.title || "")
  const [content, setContent] = useState(initialData.content || "")
  const [status, setStatus] = useState(initialData.status || "未着手")
  const [comment, setComment] = useState(initialData.comment || "")
  const [titleError, setTitleError] = useState("")
  const [contentError, setContentError] = useState("")
  const [commentError, setCommentError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTitleChange = (input: string) => {
    setTitle(input)
    setTitleError(input.length > 50 ? "タイトルは50文字以内で入力してください。" : "")
  }

  const handleContentChange = (input: string) => {
    setContent(input)
    setContentError(input.length > 100 ? "内容は100文字以内で入力してください。" : "")
  }

  const handleCommentChange = (input: string) => {
    setComment(input)
    setCommentError(input.length > 200 ? "コメントは200文字以内で入力してください。" : "")
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!titleError && !contentError && !commentError) {
      setLoading(true)
      onSubmit(title, content, status, comment)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Todo {buttonName}</h2>

      <FormField
        label="タイトル"
        type="text"
        value={title}
        onChange={handleTitleChange}
        maxLength={50}
        placeholder="タイトルを入力"
        error={titleError}
        required
      />

      <FormField
        label="内容"
        type="textarea"
        value={content}
        onChange={handleContentChange}
        maxLength={100}
        placeholder="内容を入力"
        error={contentError}
        required
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">ステータス</label>
        <Select
          value={status}
          onChange={setStatus}
          options={[
            { value: "未着手", label: "未着手" },
            { value: "途中", label: "途中" },
            { value: "完了", label: "完了" },
          ]}
        />
      </div>

      <FormField
        label="コメント"
        type="textarea"
        value={comment}
        onChange={handleCommentChange}
        maxLength={200}
        placeholder="コメントを入力"
        error={commentError}
      />

      {loading ? (
        <Loading />
      ) : (
        <Button
          onClick={() => {}}
          className="w-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
          disabled={!!(titleError || contentError || commentError)}
        >
          {buttonName}
        </Button>
      )}
    </form>
  )
}