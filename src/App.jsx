import styles from './App.module.css';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilters } from './components/TodoFilters/TodoFilters';
import { useTodo } from './hooks/todo';
import { Alert } from './components/Alerts/Alert';
import { Loader } from './components/Loader/Loader';

// const TODO_DEFAULTS = [
//   {
//     id: '1',
//     name: 'Put Mehandi on hands',
//     description: 'Apply beautiful Mehandi designs on hands',
//     deadline: "2025-12-28",
//     priority: 'low',
//     completed: false,
//   },
//   {
//     id: '2',
//     name: "Complete React",
//     description: "Finish the React course before January",
//     deadline: "2026-01-31",
//     priority: 'high',
//     completed: false,
//   },
//   {
//     id: '3',
//     name: 'Learn JavaScript',
//     description: 'Complete JavaScript fundamentals course',
//     deadline: "2025-10-31",
//     priority: 'medium',
//     completed: true,
//   },
//   {
//     id: '4',
//     name: "Present Project",
//     description: "Prepare to present the project to the judges",
//     deadline: "2026-01-31",
//     priority: 'high',
//     completed: false,
//   },
//   {
//     id: '5',
//     name: "Learn SQL",
//     description: "",
//     deadline: "",
//     priority: 'none',
//     completed: true,
//   },
// ]

function App() {
  // const [todos, setTodos] = useState([]);
  // const [filters, setFilters] = useState({});

  // async function fetchTodos(){
  //   try {
  //     const data = await api.todos.getAll(filters);
  //     setTodos(data);
  //   } catch (error) {
  //     console.error("Failed to fetch the Data")
  //   }
  //   // api.todos.getAll(filters).then(setTodos);
  // }

  // useEffect(()=>{
  //   fetchTodos();
  // }, [filters]);
  
  // async function handleCreate(newTodo){
  //   try {
  //     const data = await api.todos.create(newTodo);
  //     await fetchTodos(data);
  //   } catch (error) {
  //     console.error("Failed to create new todo.");
  //   }
  //   // setTodos((prevTodos) =>(
  //   //   [
  //   //     ...prevTodos,
  //   //     {id : `${prevTodos.length + 1}`, ...newTodo},
  //   //   ]
  //   // ));
    
  //   // api.todos.create(newTodo).then(fetchTodos);
  // }

  // async function handleUpdate(id, newTodo){
  //   try {
  //     const data = await api.todos.update(id, newTodo);
  //     await fetchTodos(data);
  //   } catch (error) {
  //     console.error("Failed to update the todo.");
  //   }
  //   // setTodos((prevTodos)=> 
  //   //   prevTodos.map((todo) => 
  //   //     id === todo.id ? newTodo: todo)
  //   // );
    
  //   // api.todos.update(id,newTodo).then(fetchTodos);
  // }

  // async function handleDelete(id){
  //   try {
  //     await api.todos.delete(id);
  //     await fetchTodos();
  //   } catch (error) {
  //     console.error("Failed to delete the todo");
  //   }
  //   // setTodos((prevTodos)=> prevTodos.filter((todo) => todo.id != id));
    
  //   // api.todos.delete(id).then(fetchTodos);
  // }

  // function filterTodos(todo){
  //   const {completed, priority} = filters;

  //   return (
  //     (completed === "" || todo.completed === completed) &&
  //     (priority === ""|| todo.priority === priority)
  //   );
  // }

  const todo = useTodo();

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
          {todo.isLoading && <Loader/>}
          {!!todo.error.message && (
            <Alert onClear={todo.error.clear}>{todo.error.message}</Alert>
          )}

          {/* to get data from Todo Form  by sending the handlecrete to onCreate as a props*/}
          <TodoForm onCreate={todo.create}/>

          <TodoFilters onFilters={todo.filter}/>

          {/* to display the todos by sending the todos and handleUpdate to onUpdate as a props */}
          <div >
            <TodoList 
              todos={todo.data} 
              onUpdate={todo.update} 
              onDelete={todo.delete} 
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
