import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './context';
import { TodoForm, TodoItem } from './components/Todo List';
// import { ThemeProvider } from './context/Theme'
// import ThemeButton from './components/ThemeButton';
// import Card from './components/Card';
function App() {

  // const [themeMode, setThemeMode] = useState("light");

  // const lightTheme = () => {
  //   setThemeMode("light");
  // }

  // const darkTheme = () => {
  //   setThemeMode("dark");
  // }

  // useEffect(() => {
  //   const html = document.querySelector('html');
  //   html.classList.remove("dark", "light");
  //   html.classList.add(themeMode);
  // }, [themeMode]);

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevState) => [...prevState, {id: Date.now(), ...todo}]);
  }

  const updateTodo = (id, todo) => {
    setTodos((prevState) => prevState.map((prevTodo) => prevTodo.id === id ? todo : prevTodo));
  }

  const deleteTodo = (id) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  }

  const toggleCompleted = (id) => {
    setTodos((prevState) => prevState.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo));
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length > 0){
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    // <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
    //   <div className="flex flex-wrap min-h-screen items-center">
    //     <div className="w-full">
    //       <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
    //           <ThemeButton />
    //       </div>

    //       <div className="w-full max-w-sm mx-auto">
    //           <Card />
    //       </div>
    //     </div>
    //   </div>
    // </ThemeProvider>
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleCompleted}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                {/* Todo form goes here */}
                <TodoForm /> 
            </div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {todos.map((todo) => (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo} />
                  </div>
                ))}
            </div>
        </div>
      </div>    
    </TodoProvider>
  )
}

export default App
