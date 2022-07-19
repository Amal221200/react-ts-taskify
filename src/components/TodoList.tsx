import "./styles.css"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/app/hooks"
import { Todo } from "../mode"
import SingleTodoItem from "./SingleTodoItem"
import { fetchTodos } from "../redux/features/todo/todoSlice"

const TodoList: React.FC = () => {
  const { todos } = useAppSelector((state) => state.todo)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList
