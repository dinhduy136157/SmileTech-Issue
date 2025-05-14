import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

type Todo = {
  id: number
  title: string
}

export default function ToDo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/clock');
  };
  const addTodo = () => {
    if (input.trim() === "") return
    const newTodo: Todo = {
      id: Date.now(),
      title: input
    }
    setTodos(prev => [...prev, newTodo])
    setInput("")
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <p>Đề bài: Tạo một danh sách todo với nút "Thêm" và "Xóa" cho t ừng item</p>
      <h1 className="text-xl font-bold mb-4">Danh sách công việc</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 px-2 py-1 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nhập công việc..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={addTodo}
        >
          Thêm
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{todo.title}</span>
            <button
              className="text-red-500 hover:underline"
              onClick={() => deleteTodo(todo.id)}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
      >
        Đi đến Bài 2
      </button>
    </div>
  )
}
