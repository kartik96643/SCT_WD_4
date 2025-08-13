import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [input, setInput] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    const todosString = localStorage.getItem('todos');
    if (todosString) {
      const todoss = JSON.parse(todosString);
      setTodos(todoss);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (!taskDate || !taskTime) {
      alert("Please select date and time for your task");
      return;
    }
    setTodos([
      ...todos,
      { id: uuidv4(), input, date: taskDate, time: taskTime, isCompleted: false }
    ]);
    setInput('');
    setTaskDate('');
    setTaskTime('');
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let todo = todos.find((i) => i.id === id);
    setInput(todo.input);
    setTaskDate(todo.date);
    setTaskTime(todo.time);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleCheckbox = (e, id) => {
    let todo = todos.find((i) => i.id === id);
    todo.isCompleted = !todo.isCompleted;
    setTodos([...todos]);
    saveToLS();
  };

  const handleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <main className="bg-purple-300 rounded-xl container mx-auto my-8 p-6 min-h-[70vh] max-w-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">Add Todos</h1>

        <div className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            value={input}
            placeholder="Task name"
            onChange={(e) => setInput(e.target.value)}
            className="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-3">
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 w-1/2"
            />
            <input
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              className="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 w-1/2"
            />
          </div>
          <button
            onClick={handleAdd}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md transition disabled:opacity-50 w-fit"
            disabled={input.length <= 2}
          >
            Add Task
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            onChange={handleFinished}
            checked={showFinished}
            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
          />
          <label className="text-sm font-medium">Show Finished Todos</label>
        </div>

        <h2 className="text-lg font-bold text-purple-800 mb-3">Your Todos</h2>

        <div className="space-y-3">
          {todos.length === 0 && (
            <div className="text-gray-500 italic">No todos</div>
          )}

          {todos.map((todo) => {
            return (
              (showFinished || !todo.isCompleted) && (
                <div
                  key={todo.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg shadow p-3 gap-2"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={(e) => handleCheckbox(e, todo.id)}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500 mt-1"
                    />
                    <div>
                      <span
                        className={`block ${
                          todo.isCompleted
                            ? 'line-through text-gray-500'
                            : 'text-gray-800'
                        } font-medium`}
                      >
                        {todo.input}
                      </span>
                      <span className="text-xs text-gray-500">
                        📅 {todo.date} ⏰ {todo.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleEdit(e, todo.id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, todo.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
