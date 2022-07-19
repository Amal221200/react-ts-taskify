import "./styles.css"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/app/hooks"
import { Todo } from "../mode"
import SingleTodoItem from "./SingleTodoItem"
import { fetchTodos } from "../redux/features/todo/todoSlice"

const TodoList: React.FC = () => {
  const { todos, loading } = useAppSelector((state) => state.todo)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className="todos">
      {!loading? todos.map((todo) => (
        <SingleTodoItem key={todo.id} todo={todo} />
      )): <h3>Loading</h3>}
    </div>
  )
}

export default TodoList
