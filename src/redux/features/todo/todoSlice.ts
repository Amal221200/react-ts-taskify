import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../../mode";

const initialState: initialState = {
    loading: false,
    todos: [],
    error: ""
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('http://localhost:5000/todos')
    const data: Todo[] = await response.json()
    return data
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
    return id
})

export const addTodo = createAsyncThunk('todos/addTodo', async (todo: string) => {
    const response = await fetch(`http://localhost:5000/todos`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ todo, isDone: false })
    })
    const data = await response.json()

    return data
})

export const doneTodo = createAsyncThunk('todos/doneTodo', async ({ id, isDone }: { id: number, isDone: boolean }) => {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({ id, isDone: !isDone })
    })
    const data = await response.json()

    return data
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, todo }: { id: number, todo: string }) => {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({ id, todo })
    })
    const data = await response.json()
    return data
})

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTask: (state: { todos: Todo[] }, action: PayloadAction<string>) => {
            state.todos = [...state.todos, { id: Date.now(), todo: action.payload, isDone: false }]
        },
        deleteTask: (state: { todos: Todo[] }, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => action.payload !== todo.id!)
        },
        doneTask: (state: { todos: Todo[] }, action: PayloadAction<number>) => {
            state.todos = state.todos.map(todo => action.payload === todo.id ? { ...todo, isDone: !todo.isDone } : todo)
        },
        editTask: (state: { todos: Todo[] }, action: PayloadAction<editTaskType>) => {
            state.todos = state.todos.map(todo => action.payload.id === todo.id ? { ...todo, todo: action.payload.editTodo } : todo)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
            state.loading = false
            state.todos = action.payload
            state.error = ""
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Error occured"
        });
        builder.addCase(deleteTodo.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
            state.error = ""
        });
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Error occured"
        });
        builder.addCase(addTodo.pending, (state) => {
            state.loading = true
        });
        builder.addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
            state.loading = false
            state.todos = [...state.todos, action.payload]
            state.error = ""
        });
        builder.addCase(addTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Error occured"
        });
        builder.addCase(doneTodo.pending, (state) => {
            state.loading = true
        });
        builder.addCase(doneTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
            state.loading = false
            state.todos = state.todos.map(todo => action.payload.id === todo.id ? { ...todo, isDone: action.payload.isDone } : todo)
            state.error = ""
        });
        builder.addCase(doneTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Error occured"
        });
    }
})

// Types

type initialState = {
    loading: boolean,
    todos: Todo[],
    error: string
}

type editTaskType = {
    id: number,
    editTodo: string
}

type doneTodoType = {
    id: number,
    isDone: boolean
}

type updateTodoType = Todo & {
    update: 'todo' | 'isDone'
}

export const { addTask, deleteTask, doneTask, editTask } = todoSlice.actions
export default todoSlice.reducer 