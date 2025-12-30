import { useState } from 'react';
import styles from './App.module.css';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilters } from './components/TodoFilters/TodoFilters';

const TODO_DEFAULTS = [
  {
    id: '1',
    name: 'Put Mehandi on hands',
    description: 'Apply beautiful Mehandi designs on hands',
    deadline: "2025-12-28",
    priority: 'low',
    completed: false,
  },
  {
    id: '2',
    name: "Complete React",
    description: "Finish the React course before January",
    deadline: "2026-01-31",
    priority: 'high',
    completed: false,
  },
  {
    id: '3',
    name: 'Learn JavaScript',
    description: 'Complete JavaScript fundamentals course',
    deadline: "2025-10-31",
    priority: 'medium',
    completed: true,
  },
  {
    id: '4',
    name: "Present Project",
    description: "Prepare to present the project to the judges",
    deadline: "2026-01-31",
    priority: 'high',
    completed: false,
  },
  {
    id: '5',
    name: "Learn SQL",
    description: "",
    deadline: "",
    priority: 'none',
    completed: true,
  },
]

function App() {
  const [todos, setTodos] = useState(TODO_DEFAULTS);
  const [filters, setFilters] = useState({});


  function handleCreate(newTodo){
    setTodos((prevTodos) =>(
      [
        ...prevTodos,
        {id : `${prevTodos.length + 1}`, ...newTodo},
      ]
    ));
  }

  function handleUpdate(id, newTodo){
    setTodos((prevTodos)=> 
      prevTodos.map((todo) => 
        id === todo.id ? newTodo: todo)
    );  
  }

  function handleDelete(id){
    setTodos((prevTodos)=> prevTodos.filter((todo) => todo.id != id));
  }

  function filterTodos(todo){
    const {completed, priority} = filters;

    return (
      (completed === "" || todo.completed === completed) &&
      (priority === ""|| todo.priority === priority)
    );
  }

  return (
    <>
    {/* creating page format */}
      <div className={styles.App}>
        {/* Header */}
        <header className={styles.Header}>
          <img src="/todo-icon.png" alt="Todo Icon" className={styles.Logo} />
          <h1 className={styles.Title} >To-Do App</h1>
        </header>

        {/* Main Container */}
        <div className={styles.AppContainer}>
          {/* to get data from Todo Form  by sending the handlecrete to onCreate as a props*/}
          <TodoForm onCreate={handleCreate}/>

          <TodoFilters onFilters={setFilters}/>

          {/* to display the todos by sending the todos and handleUpdate to onUpdate as a props */}
          <div >
            <TodoList 
          todos={todos.filter(filterTodos)} 
          onUpdate={handleUpdate} 
          onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
