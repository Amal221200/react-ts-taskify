import React, { useState } from 'react'
import { addTodo } from './redux/features/todo/todoSlice'
import { useAppDispatch } from './redux/app/hooks'
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const dispatch = useAppDispatch()

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch(addTodo(todo))
    }
    setTodo("")
  }
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList />
    </div>
  )
}

export default App
