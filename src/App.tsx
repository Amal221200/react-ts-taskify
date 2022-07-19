import React, { useState } from 'react'
import { addTodo } from './redux/features/todo/todoSlice'
import { useAppDispatch, useAppSelector } from './redux/app/hooks'
import { CircularProgress } from "@mui/material"
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.todo)
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch(addTodo(todo))
    }
    setTodo("")
  }
  return (
    <div className="App">
      <span className="heading">Taskify {loading && <CircularProgress sx={{color: "#002884", marginLeft: '2rem'}} />}</span>
      
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList />
    </div>
  )
}

export default App
