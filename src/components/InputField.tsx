import "./styles.css"
import { useRef } from "react"

const InputField: React.FC<InputFieldProps> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <form className='input' onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur();
        }}>
            <input type="text" ref={inputRef} placeholder='Enter a task' className='input__box' value={todo} onChange={(e) => { setTodo(e.target.value) }} />
            <button type="submit" className="input__submit">Go</button>
        </form>
    )
}

export default InputField

type InputFieldProps = {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void
}