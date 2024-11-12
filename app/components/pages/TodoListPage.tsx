import React from "react";
import { TodoListTemplate } from "../../components/templates/TodoListTemplate";
import type { TodoListType } from "../../../utils/todo.types";

type TodoListPageProps = {
  todos: TodoListType[];
};

const TodoListPage: React.FC<TodoListPageProps> = ({ todos }) => {
  return <TodoListTemplate todos={todos} />;
};

export default TodoListPage;
